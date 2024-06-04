// participacaoMusica.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddParticipacaoMusicaDto } from './dto/addParticipacaoMusicaDto';
import { UpdateParticipacaoMusicaDto } from './dto/updateParticipacaoMusicaDto';

@Injectable()
export class ParticipacaoMusicaService {
  constructor(private prisma: PrismaService) { }

  async add(data: AddParticipacaoMusicaDto) {
    try {
      const response = await this.prisma.participacaoMusica.create({ data });
      return response;
    } catch (error) {
      throw new Error(`Failed to create participation: ${error.message}`);
    }
  }

  async update(data: UpdateParticipacaoMusicaDto) {
    try {
      const { codParticipacaoMusica, ...rest } = data;
      const response = await this.prisma.participacaoMusica.update({
        where: { codParticipacaoMusica },
        data: rest,
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to update participation: ${error.message}`);
    }
  }

  async remove(id: number) {
    const response = await this.prisma.participacaoMusica.delete({
      where: { codParticipacaoMusica: id },
    });
    return response;
  }

  async getOne(id: number) {
    const response = await this.prisma.participacaoMusica.findUnique({
      where: { codParticipacaoMusica: id },
    });
    if (!response) {
      throw new NotFoundException(`Participation with ID ${id} not found`);
    }
    return response;
  }

  async listarParticipacoes() {
    const response = await this.prisma.participacaoMusica.findMany({
      include: {
        artista: true,
        musica: true,
      },
    });
    return response;
  }
}
