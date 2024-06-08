import { Injectable, NotFoundException } from '@nestjs/common';
import { AddVideosDaPlaylistDto } from './dto/addVideosDaPlaylistDto';
import { UpdateVideosDaPlaylistDto } from './dto/updateVideosDaPlaylistDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VideosDaPlaylistService {
  constructor(private prisma: PrismaService) { }

  async add(data: AddVideosDaPlaylistDto) {
    try {
      const response = await this.prisma.videosDaPlaylist.create({
        data,
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to add video to playlist: ${error.message}`);
    }
  }

  async update(data: UpdateVideosDaPlaylistDto) {
    try {
      const response = await this.prisma.videosDaPlaylist.update({
        where: {
          codVideosDaPlayList: data.codVideosDaPlayList,
        },
        data,
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to update video in playlist: ${error.message}`);
    }
  }

  async remove(id: number) {
    const response = await this.prisma.videosDaPlaylist.delete({
      where: { codVideosDaPlayList: id },
    });
    return response;
  }

  async getOne(id: number) {
    const response = await this.prisma.videosDaPlaylist.findUnique({
      where: { codVideosDaPlayList: id },
    });

    if (!response) {
      throw new NotFoundException(`Video in playlist with ID ${id} not found`);
    }

    return response;
  }

  async listarVideosDaPlaylist() {
    const response = await this.prisma.videosDaPlaylist.findMany({
      include: {
        video: true,
        playlist: true,
      },
    });

    return response;
  }
}
