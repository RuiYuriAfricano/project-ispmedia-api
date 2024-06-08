import { Module } from '@nestjs/common';
import { PartilhaDeConteudoController } from './partilhaDeConteudo.controller';
import { PartilhaDeConteudoService } from './partilhaDeConteudo.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PartilhaDeConteudoController],
  providers: [PartilhaDeConteudoService, PrismaService],
})
export class PartilhaDeConteudoModule { }
