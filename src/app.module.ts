/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UtilizadorModule } from './utilizador/utilizador.module';
import { GrupoMusicalModule } from './grupomusical/grupoMusical.module';
import { PrismaService } from './prisma/prisma.service';


@Module({
  imports: [UtilizadorModule, GrupoMusicalModule],
  providers: [PrismaService],
})
export class AppModule { }
