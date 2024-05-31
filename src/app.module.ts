/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UtilizadorModule } from './utilizador/utilizador.module';
import { GrupoMusicalModule } from './grupomusical/grupoMusical.module';
import { ArtistaModule } from './artista/artista.module';
import { PrismaService } from './prisma/prisma.service';
import { AlbumModule } from './album/album.module';


@Module({
  imports: [UtilizadorModule, GrupoMusicalModule, ArtistaModule, AlbumModule],
  providers: [PrismaService],
})
export class AppModule { }
