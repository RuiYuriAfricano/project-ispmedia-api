import { Module } from '@nestjs/common';
import { VideosDaPlaylistService } from './videosDaPlaylist.service';
import { VideosDaPlaylistController } from './videosDaPlaylist.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [VideosDaPlaylistController],
  providers: [VideosDaPlaylistService, PrismaService],
})
export class VideosDaPlaylistModule { }
