import { Module } from '@nestjs/common';
import { MembrosDaListaDePartilhasService } from './membrosDaListaDePartilhas.service';
import { MembrosDaListaDePartilhasController } from './membrosDaListaDePartilhas.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MembrosDaListaDePartilhasController],
  providers: [MembrosDaListaDePartilhasService, PrismaService],
})
export class MembrosDaListaDePartilhasModule { }
