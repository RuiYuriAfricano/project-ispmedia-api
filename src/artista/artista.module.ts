import { Module } from '@nestjs/common';
import { ArtistaService } from './artista.service';
import { ArtistaController } from './artista.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ArtistaController],
  providers: [ArtistaService, PrismaService],
})
export class ArtistaModule { }
