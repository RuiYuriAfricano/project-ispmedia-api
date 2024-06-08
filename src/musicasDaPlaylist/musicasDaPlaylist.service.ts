import { Injectable, NotFoundException } from '@nestjs/common';
import { AddMusicasDaPlaylistDto } from './dto/addMusicasDaPlaylistDto';
import { UpdateMusicasDaPlaylistDto } from './dto/updateMusicasDaPlaylistDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MusicasDaPlaylistService {
  constructor(private prisma: PrismaService) { }

  async add(data: AddMusicasDaPlaylistDto) {
    try {
      const response = await this.prisma.musicasDaPlaylist.create({
        data,
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to add music to playlist: ${error.message}`);
    }
  }

  async update(data: UpdateMusicasDaPlaylistDto) {
    try {
      const response = await this.prisma.musicasDaPlaylist.update({
        where: {
          codMusicasDaPlayList: data.codMusicasDaPlayList,
        },
        data,
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to update music in playlist: ${error.message}`);
    }
  }

  async remove(id: number) {
    const response = await this.prisma.musicasDaPlaylist.delete({
      where: { codMusicasDaPlayList: id },
    });
    return response;
  }

  async getOne(id: number) {
    const response = await this.prisma.musicasDaPlaylist.findUnique({
      where: { codMusicasDaPlayList: id },
    });

    if (!response) {
      throw new NotFoundException(`Music in playlist with ID ${id} not found`);
    }

    return response;
  }

  async listarMusicasDaPlaylist() {
    const response = await this.prisma.musicasDaPlaylist.findMany({
      include: {
        musica: true,
        playlist: true,
      },
    });

    return response;
  }
}
