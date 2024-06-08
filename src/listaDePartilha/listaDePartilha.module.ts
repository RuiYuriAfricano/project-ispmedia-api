import { Module } from '@nestjs/common';
import { ListaDePartilhaService } from './listaDePartilha.service';
import { ListaDePartilhaController } from './listaDePartilha.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ListaDePartilhaController],
  providers: [ListaDePartilhaService, PrismaService],
})
export class ListaDePartilhaModule { }
