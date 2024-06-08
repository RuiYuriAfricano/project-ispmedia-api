import { Module } from '@nestjs/common';
import { MembrosDosGruposService } from './membrosDosGrupos.service';
import { MembrosDosGruposController } from './membrosDosGrupos.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MembrosDosGruposController],
  providers: [MembrosDosGruposService, PrismaService],
})
export class MembrosDosGruposModule { }
