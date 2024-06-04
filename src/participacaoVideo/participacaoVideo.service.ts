// participacaoVideo.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddParticipacaoVideoDto } from './dto/addParticipacaoVideoDto';
import { UpdateParticipacaoVideoDto } from './dto/updateParticipacaoVideoDto';

@Injectable()
export class ParticipacaoVideoService {
  constructor(private prisma: PrismaService) { }

  async add(data: AddParticipacaoVideoDto) {
    try {
      const response = await this.prisma.participacaoVideo.create({ data });
      return response;
    } catch (error) {
      throw new Error(`Failed to create participation: ${error.message}`);
    }
  }

  async update(data: UpdateParticipacaoVideoDto) {
    try {
      const { codParticipacaoVideo, ...rest } = data;
      const response = await this.prisma.participacaoVideo.update({
        where: { codParticipacaoVideo },
        data: rest,
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to update participation: ${error.message}`);
    }
  }

  async remove(id: number) {
    const response = await this.prisma.participacaoVideo.delete({
      where: { codParticipacaoVideo: id },
    });
    return response;
  }

  async getOne(id: number) {
    const response = await this.prisma.participacaoVideo.findUnique({
      where: { codParticipacaoVideo: id },
    });
    if (!response) {
      throw new NotFoundException(`Participation with ID ${id} not found`);
    }
    return response;
  }

  async listarParticipacoes() {
    const response = await this.prisma.participacaoVideo.findMany(
      {
        include: {
          artista: true,
          video: true,
        },
      }
    );
    return response;
  }
}
