import { Module } from '@nestjs/common';
import { ParticipacaoVideoService } from './participacaoVideo.service'
import { ParticipacaoVideoController } from './participacaoVideo.controller';

import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ParticipacaoVideoController],
  providers: [ParticipacaoVideoService, PrismaService],
})
export class ParticipacaoVideoModule { }
