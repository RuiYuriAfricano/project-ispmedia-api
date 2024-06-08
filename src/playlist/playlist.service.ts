import { Injectable, NotFoundException } from '@nestjs/common';
import { AddPlaylistDto } from './dto/addPlaylistDto';
import { UpdatePlaylistDto } from './dto/updatePlaylistDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlaylistService {
  constructor(private prisma: PrismaService) { }

  async add(data: AddPlaylistDto) {
    try {
      const response = await this.prisma.playlist.create({
        data,
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to create playlist: ${error.message}`);
    }
  }

  async update(data: UpdatePlaylistDto) {
    try {
      const response = await this.prisma.playlist.update({
        where: {
          codPlayList: data.codPlayList,
        },
        data,
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to update playlist: ${error.message}`);
    }
  }

  async remove(id: number) {
    const response = await this.prisma.playlist.delete({
      where: { codPlayList: id },
    });
    return response;
  }

  async getOne(id: number) {
    const response = await this.prisma.playlist.findUnique({
      where: { codPlayList: id },
    });

    if (!response) {
      throw new NotFoundException(`Playlist with ID ${id} not found`);
    }

    return response;
  }

  async listarPlaylists() {
    const response = await this.prisma.playlist.findMany({
      include: {
        utilizador: {
          select: {
            username: true,
          },
        },
        MusicasDaPlaylist: true,
        videosDaPlaylist: true,
      },
    });

    return response;
  }
}
