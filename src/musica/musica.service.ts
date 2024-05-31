import { Injectable, NotFoundException } from '@nestjs/common';
import { AddMusicaDto } from './dto/addMusicaDto';
import { UpdateMusicaDto } from './dto/updateMusicaDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MusicaService {
  constructor(private prisma: PrismaService) { }

  async add(data: AddMusicaDto) {
    try {
      const response = await this.prisma.musica.create({ data });
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
}
