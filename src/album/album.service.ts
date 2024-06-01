import { Injectable, NotFoundException } from '@nestjs/common';
import { AddAlbumDto } from './dto/addAlbumDto';
import { UpdateAlbumDto } from './dto/updateAlbumDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) { }

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
    const currentDate = new Date().toISOString();
    let dataLancamento: string;
    let dataDeRegistro: string;

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
}
