import { Module } from '@nestjs/common';
import { CriticaService } from './criticas.service';
import { CriticaController } from './criticas.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CriticaController],
  providers: [CriticaService, PrismaService],
})
export class AlbumModule { }
