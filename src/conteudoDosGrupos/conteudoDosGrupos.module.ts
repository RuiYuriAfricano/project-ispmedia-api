import { Module } from '@nestjs/common';
import { ConteudoDosGruposService } from './conteudoDosGrupos.service';
import { ConteudoDosGruposController } from './conteudoDosGrupos.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ConteudoDosGruposController],
  providers: [ConteudoDosGruposService, PrismaService],
})
export class ConteudoDosGruposModule { }
