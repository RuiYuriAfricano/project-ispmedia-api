/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UtilizadorModule } from './utilizador/utilizador.module';
import { PrismaService } from './prisma/prisma.service';


@Module({
  imports: [UtilizadorModule],
  providers: [PrismaService],
})
export class AppModule { }
