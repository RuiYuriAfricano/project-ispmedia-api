import { Module } from '@nestjs/common';
import { ParticipacaoMusicaService } from './participacaoMusica.service'
import { ParticipacaoMusicaController } from './participacaoMusica.controller';

import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ParticipacaoMusicaController],
  providers: [ParticipacaoMusicaService, PrismaService],
})
export class ParticipacaoMusicaModule { }
