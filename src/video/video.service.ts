import { Injectable, NotFoundException } from '@nestjs/common';
import { AddVideoDto } from './dto/addVideoDto';
import { UpdateVideoDto } from './dto/updateVideoDto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs-extra';
import * as path from 'path';

@Injectable()
export class VideoService {
  constructor(private prisma: PrismaService) { }

  async add(data: AddVideoDto) {

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
      const response = await this.prisma.video.create({
        data: {
          tituloVideo: data.tituloVideo,
          ficheiroDoVideo: data.ficheiroDoVideo,
          legenda: data.legenda,
          produtor: data.produtor,
          generoDoVIdeo: data.generoDoVideo,
          fkGrupoMusical: data.fkGrupoMusical,
          fkArtista: data.fkArtista,
          dataLancamento: dataLancamento,
          fkUtilizador: data.fkUtilizador,
          dataDeRegisto: dataDeRegistro
        }
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to create video: ${error.message}`);
    }
  }

  async update(data: UpdateVideoDto) {

    let dataLancamento: string;

    try {
      dataLancamento = new Date(data.dataLancamento).toISOString();
    } catch (error) {
      throw new Error('Invalid date value');
    }

    try {
      const response = await this.prisma.video.update({
        where: { codVideo: data.codVideo },
        data: {
          tituloVideo: data.tituloVideo,
          ficheiroDoVideo: data.ficheiroDoVideo,
          legenda: data.legenda,
          produtor: data.produtor,
          generoDoVIdeo: data.generoDoVideo,
          fkGrupoMusical: data.fkGrupoMusical,
          fkArtista: data.fkArtista,
          dataLancamento: dataLancamento,
          fkUtilizador: data.fkUtilizador,
        },
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to update video: ${error.message}`);
    }
  }

  async remove(id: number) {
    const response = await this.prisma.video.delete({
      where: { codVideo: id },
    });
    return response;
  }

  async getOne(id: number) {
    const response = await this.prisma.video.findUnique({
      where: { codVideo: id },
      include: {
        grupoMusical: true,
        artista: true,
        registadopor: true,
      },
    });
    if (!response) {
      throw new NotFoundException(`Video with ID ${id} not found`);
    }
    return response;
  }

  async listarVideos() {
    const response = await this.prisma.video.findMany({
      include: {
        grupoMusical: true,
        artista: true,
        registadopor: true,
      },
    });
    return response;
  }

  async downloadVideo(id: number, range?: string) {
    const video = await this.prisma.video.findUnique({
      where: { codVideo: id },
    });
    if (!video) {
      throw new NotFoundException('Video não encontrada');
    }

    const filePath = path.join(__dirname, '..', '..', 'uploadvideos', video.ficheiroDoVideo);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Video não encontrada no sistema de arquivos');
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
        'Content-Type': 'video/mp4',
      };

      return { headers, filePath, start, end };
    } else {
      const headers = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };

      return { headers, filePath, start: 0, end: fileSize - 1 };
    }
  }


}
