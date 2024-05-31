import { Module } from '@nestjs/common';
import { MusicaService } from './musica.service';
import { MusicaController } from './musica.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MusicaController],
  providers: [MusicaService, PrismaService],
})
export class MusicaModule { }
