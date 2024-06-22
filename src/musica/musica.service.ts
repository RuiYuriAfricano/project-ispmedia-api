import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { AddMusicaDto } from './dto/addMusicaDto';
import { UpdateMusicaDto } from './dto/updateMusicaDto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as ffmpeg from 'fluent-ffmpeg';
import { parse, format } from 'path';
import { createReadStream, existsSync, statSync } from 'fs';
import { join } from 'path';
import * as rangeParser from 'range-parser';
import { Response } from 'express';
@Injectable()
export class MusicaService {
  constructor(private prisma: PrismaService) { }

  async add(data: AddMusicaDto) {

    const currentDate = new Date().toISOString();
    let dataLancamento: string;
    let dataDeRegistro: string;

    try {
      dataLancamento = new Date(data.dataLancamento).toISOString();
      dataDeRegistro = currentDate;
    } catch (error) {
      throw new Error('Invalid date value');
    }

    try {
      const response = await this.prisma.musica.create({
        data: {
          tituloMusica: data.tituloMusica,
          ficheiroMusical: data.ficheiroMusical,
          letra: data.letra,
          compositor: data.compositor,
          generoMusical: data.generoMusical,
          capaMusica: data.capaMusica,
          fkGrupoMusical: data.fkGrupoMusical,
          fkArtista: data.fkArtista,
          fkAlbum: data.fkAlbum,
          dataLancamento: dataLancamento,
          fkUtilizador: data.fkUtilizador,
          dataDeRegisto: dataDeRegistro
        }
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to create musica: ${error.message}`);
    }
  }

  async update(data: UpdateMusicaDto) {

    let dataLancamento: string;

    try {
      dataLancamento = new Date(data.dataLancamento).toISOString();
    } catch (error) {
      throw new Error('Invalid date value');
    }

    try {
      const response = await this.prisma.musica.update({
        where: { codMusica: data.codMusica },
        data: {
          ...data,
          dataLancamento,
        },
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to update musica: ${error.message}`);
    }
  }

  async remove(id: number) {
    const response = await this.prisma.musica.delete({
      where: { codMusica: id },
    });
    return response;
  }

  async getOne(id: number) {
    const response = await this.prisma.musica.findUnique({
      where: { codMusica: id },
      include: {
        album: true,
        grupoMusical: true,
        artista: true,
        registadopor: true,
      },
    });
    if (!response) {
      throw new NotFoundException(`Musica with ID ${id} not found`);
    }
    return response;
  }

  async listarMusicas() {
    const response = await this.prisma.musica.findMany({
      include: {
        album: true,
        grupoMusical: true,
        artista: true,
        registadopor: true,
      },
    });
    return response;
  }

  async listarMusicasPorPagina(page = 1, pageSize = 10) {
    const skip = (page - 1) * pageSize;
    const response = await this.prisma.musica.findMany({
      include: {
        album: true,
        grupoMusical: true,
        artista: true,
        registadopor: true,
      },
      orderBy: {
        dataDeRegisto: 'desc', // Ordena de forma decrescente pela data de registro
      },
      skip,
      take: pageSize,
    });
    return response;
  }
  async downloadCapa(id: number) {
    const musica = await this.prisma.musica.findUnique({
      where: { codMusica: id },
    });
    if (musica === null) {
      throw new NotFoundException('Capa não encontrada para este Musica');
    }

    const filePath = path.join(__dirname, '..', '..', 'uploadmusicas', musica.capaMusica);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Capa não encontrada no sistema de arquivos');
    }


    return filePath;
  }

  async downloadMusic(id: number, range?: string) {
    const music = await this.prisma.musica.findUnique({
      where: { codMusica: id },
    });
    if (!music) {
      throw new NotFoundException('Música não encontrada');
    }

    const filePath = path.join(__dirname, '..', '..', 'uploadmusicas', music.ficheiroMusical);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Música não encontrada no sistema de arquivos');
    }

    const fileStat = await fs.stat(filePath);
    const fileSize = fileStat.size;
    const CHUNK_SIZE = 100000; // 100KB chunks

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : Math.min(start + CHUNK_SIZE - 1, fileSize - 1);

      const contentLength = end - start + 1;

      const headers = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': contentLength,
        'Content-Type': 'audio/mpeg',
      };

      return { headers, filePath, start, end };
    } else {
      const headers = {
        'Content-Length': fileSize,
        'Content-Type': 'audio/mpeg',
      };

      return { headers, filePath, start: 0, end: fileSize - 1 };
    }
  }

  async convertAudioToMP3(audioPath: string): Promise<string> {
    const outputPath = audioPath.replace(/(\.\w+)$/, '-converted.mp3');

    return new Promise<string>((resolve, reject) => {
      ffmpeg(audioPath)
        .outputOptions([
          '-codec:a libmp3lame', // MP3 codec
          '-b:a 128k', // Set the audio bitrate to 128kbps
          '-qscale:a 5', // Adjust quality scale (0-9, where lower is better quality)
          '-map_metadata -1' // Remove all metadata
        ])
        .save(outputPath)
        .on('end', () => {
          console.log(`Audio conversion finished: ${outputPath}`);
          resolve(outputPath);
        })
        .on('error', (err) => {
          console.error(`Failed to convert audio: ${err.message}`);
          reject(new Error(`Failed to convert audio: ${err.message}`));
        });
    });
  }
  async convertAndResizeImageToJPG(imagePath: string): Promise<string> {
    const parsedPath = parse(imagePath);
    const outputDir = parsedPath.dir;
    const outputPath = format({
      dir: outputDir,
      name: parsedPath.name + '-compressed',
      ext: '.jpg'
    });

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    return new Promise<string>((resolve, reject) => {
      ffmpeg(imagePath)
        .outputOptions([
          '-vf scale=300:170', // Resize to 128x128 pixels
          '-q:v 5', // Quality level
          '-format jpeg', // Convert to JPEG
          '-map_metadata -1' // Remove all metadata
        ])
        .save(outputPath)
        .on('end', () => {
          console.log(`Image conversion and resizing finished: ${outputPath}`);
          resolve(outputPath);
        })
        .on('error', (err) => {
          console.error(`Failed to convert and resize image: ${err.message}`);
          reject(new Error(`Failed to convert and resize image: ${err.message}`));
        });
    });
  }

}
