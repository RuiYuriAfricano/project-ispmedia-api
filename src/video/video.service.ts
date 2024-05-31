import { Injectable, NotFoundException } from '@nestjs/common';
import { AddVideoDto } from './dto/addVideoDto';
import { UpdateVideoDto } from './dto/updateVideoDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VideoService {
  constructor(private prisma: PrismaService) { }

  async add(data: AddVideoDto) {
    try {
      const response = await this.prisma.video.create({ data });
      return response;
    } catch (error) {
      throw new Error(`Failed to create video: ${error.message}`);
    }
  }

  async update(data: UpdateVideoDto) {
    try {
      const response = await this.prisma.video.update({
        where: { codVideo: data.codVideo },
        data,
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
}
