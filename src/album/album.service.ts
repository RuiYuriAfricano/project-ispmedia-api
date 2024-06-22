import { Injectable, NotFoundException } from '@nestjs/common';
import { AddAlbumDto } from './dto/addAlbumDto';
import { UpdateAlbumDto } from './dto/updateAlbumDto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as winattr from 'winattr'; // Import winattr to set hidden attribute
import * as ffmpeg from 'fluent-ffmpeg';
import { parse, format } from 'path';

@Injectable()
export class AlbumService {
  private readonly CAPA_FOLDER = path.resolve(__dirname, '..', '..', 'upload', 'capas');

  constructor(private prisma: PrismaService) {
    // Verifica se a pasta de capas existe, se não, cria-a
    if (!fs.existsSync(this.CAPA_FOLDER)) {
      fs.mkdirSync(this.CAPA_FOLDER, { recursive: true });
    }
  }

  async add(data: AddAlbumDto) {
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
      const response = await this.prisma.album.create({
        data: {
          ...data,
          dataLancamento,
          dataDeRegistro,
        },
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to create album: ${error.message}`);
    }
  }

  async update(data: UpdateAlbumDto) {
    let dataLancamento: string;

    try {
      dataLancamento = new Date(data.dataLancamento).toISOString();
    } catch (error) {
      throw new Error('Invalid date value');
    }

    try {
      const response = await this.prisma.album.update({
        where: { codAlbum: data.codAlbum },
        data: {
          ...data,
          dataLancamento,
        },
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to update album: ${error.message}`);
    }
  }

  async remove(id: number) {
    const response = await this.prisma.album.delete({
      where: { codAlbum: id },
    });
    return response;
  }

  async getOne(id: number) {
    const response = await this.prisma.album.findUnique({
      where: { codAlbum: id },
    });
    if (!response) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return response;
  }

  async listarAlbuns() {
    const response = await this.prisma.album.findMany({
      include: {
        artista: true,
        grupoMusical: true,
        registadopor: true,
      },
    });
    return response;
  }

  async listarAlbunsPorPagina(page = 1, pageSize = 10) {
    const skip = (page - 1) * pageSize;
    const response = await this.prisma.album.findMany({
      include: {
        grupoMusical: true,
        artista: true,
        registadopor: true,
      },
      orderBy: {
        dataDeRegistro: 'desc', // Ordena de forma decrescente pela data de registro
      },
      skip,
      take: pageSize,
    });
    return response;
  }
  async pesquisaPorTitulo(titulo: string) {
    const response = await this.prisma.album.findMany({
      where: {
        tituloAlbum: {
          contains: titulo,
        },
      },
      include: {
        artista: true,
        grupoMusical: true,
        registadopor: true,
      },
    });
    return response;
  }

  async downloadCapa(id: number) {
    const album = await this.prisma.album.findUnique({
      where: { codAlbum: id },
    });
    if (album === null) {
      throw new NotFoundException('Capa não encontrada para este álbum');
    }

    const filePath = path.join(__dirname, '..', '..', 'uploadcapasalbum', album.capaAlbum);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Capa não encontrada no sistema de arquivos');
    }


    return filePath;
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
          '-vf scale=128:128', // Resize to 128x128 pixels
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
