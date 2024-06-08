import { Module } from '@nestjs/common';
import { GrupoDeAmigosService } from './grupoDeAmigos.service';
import { GrupoDeAmigosController } from './grupoDeAmigos.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [GrupoDeAmigosController],
  providers: [GrupoDeAmigosService, PrismaService],
})
export class GrupoDeAmigosModule { }
