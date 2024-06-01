import { Injectable, NotFoundException } from '@nestjs/common';
import { AddMusicaDto } from './dto/addMusicaDto';
import { UpdateMusicaDto } from './dto/updateMusicaDto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs-extra';
import * as path from 'path';
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
    try {
      const response = await this.prisma.musica.update({
        where: { codMusica: data.codMusica },
        data,
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
  async downloadMusica(id: number) {
    const musica = await this.prisma.musica.findUnique({
      where: { codMusica: id },
    });
    if (musica === null) {
      throw new NotFoundException('Musica não encontrada');
    }

    const filePath = path.join(__dirname, '..', '..', 'uploadmusicas', musica.ficheiroMusical);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Musica não encontrada no sistema de arquivos');
    }


    return filePath;
  }
}
