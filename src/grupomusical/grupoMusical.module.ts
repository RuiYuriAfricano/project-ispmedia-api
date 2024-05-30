import { Module } from '@nestjs/common';
import { GrupoMusicalService } from './grupoMusical.service';
import { GrupoMusicalController } from './grupoMusical.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [GrupoMusicalController],
  providers: [GrupoMusicalService, PrismaService],
})
export class GrupoMusicalModule { }
