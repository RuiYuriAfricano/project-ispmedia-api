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
          ...data,
          dataLancamento,
          generoDoVIdeo: data.generoDoVideo,
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

  async downloadVideo(id: number) {
    const video = await this.prisma.video.findUnique({
      where: { codVideo: id },
    });
    if (video === null) {
      throw new NotFoundException('Video não encontrada');
    }

    const filePath = path.join(__dirname, '..', '..', 'uploadvideos', video.ficheiroDoVideo);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Video não encontrada no sistema de arquivos');
    }


    return filePath;
  }

}
