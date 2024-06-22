import { Injectable, NotFoundException } from '@nestjs/common';
import { AddVideoDto } from './dto/addVideoDto';
import { UpdateVideoDto } from './dto/updateVideoDto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as ffmpeg from 'fluent-ffmpeg';

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
          dataDeRegisto: dataDeRegistro,
        },
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

  async listarVideosPorPagina(page = 1, pageSize = 10) {
    const skip = (page - 1) * pageSize;
    const response = await this.prisma.video.findMany({
      include: {
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

  async getThumbnail(id: number) {
    const video = await this.prisma.video.findUnique({
      where: { codVideo: id },
    });
    if (!video) {
      throw new NotFoundException('Video não encontrada');
    }

    const videoPath = path.join(__dirname, '..', '..', 'uploadvideos', video.ficheiroDoVideo);
    if (!fs.existsSync(videoPath)) {
      throw new NotFoundException('Video não encontrada no sistema de arquivos');
    }

    const thumbnailPath = path.join(__dirname, '..', '..', 'uploadvideos', 'thumbnails', `${video.codVideo}.png`);
    await fs.ensureDir(path.dirname(thumbnailPath));

    return new Promise<string>((resolve, reject) => {
      ffmpeg(videoPath)
        .screenshots({
          count: 1,
          folder: path.dirname(thumbnailPath),
          filename: path.basename(thumbnailPath),
          size: '320x240',
        })
        .on('end', () => resolve(thumbnailPath))
        .on('error', (err) => reject(new Error(`Failed to generate thumbnail: ${err.message}`)));
    });
  }

  async processVideo(videoPath: string): Promise<string> {
    const outputPath = videoPath.replace(/(\.\w+)$/, '-compressed.mp4');

    return new Promise<string>((resolve, reject) => {
      ffmpeg(videoPath)
        .outputOptions([
          '-movflags faststart', // otimizar para streaming
          '-pix_fmt yuv420p', // garantir compatibilidade
          '-vf scale=1280:720', // ajustar resolução
          '-b:v 800k', // ajustar bitrate para um valor mais baixo
          '-crf 30', // fator de qualidade constante mais agressivo
          '-preset fast', // acelerar compressão
          '-acodec aac', // codec de áudio
          '-b:a 120k', // bitrate de áudio para reduzir tamanho
          '-strict experimental',
          '-metadata title=', // remover metadados de título
          '-metadata comment=', // remover metadados de comentário
          '-metadata creation_time=', // remover metadados de data de criação
          '-metadata modification_time=' // remover metadados de data de modificação
        ])
        .save(outputPath)
        .on('end', () => {
          console.log(`Video processing finished: ${outputPath}`);
          resolve(outputPath);
        })
        .on('error', (err) => {
          console.error(`Failed to process video: ${err.message}`);
          reject(new Error(`Failed to process video: ${err.message}`));
        });
    });
  }
}
