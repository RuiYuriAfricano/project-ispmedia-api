import { Module } from '@nestjs/common';
import { MusicasDaPlaylistService } from './musicasDaPlaylist.service';
import { MusicasDaPlaylistController } from './musicasDaPlaylist.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MusicasDaPlaylistController],
  providers: [MusicasDaPlaylistService, PrismaService],
})
export class MusicasDaPlaylistModule { }
