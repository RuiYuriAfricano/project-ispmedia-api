/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { AddGrupoMusicalDto } from './dto/addGrupoMusicalDto';
import { UpdateGrupoMusicalDto } from './dto/updateGrupoMusicalDto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class GrupoMusicalService {

  constructor(private prisma: PrismaService) { }

  async add(data: AddGrupoMusicalDto) {
    // Valida e converte as datas para o formato ISO 8601, se forem fornecidas
    const currentDate = new Date().toISOString();
    let dataDeCriacao: string;

    try {
      dataDeCriacao = data.dataDeCriacao ? new Date(data.dataDeCriacao).toISOString() : currentDate;
    } catch (error) {
      throw new Error('Invalid dataDeRegisto value ' + dataDeCriacao);
    }

    try {
      const response = await this.prisma.grupoMusical.create({
        data: {
          ...data,
          dataDeCriacao: dataDeCriacao,
          dataDeRegisto: currentDate,
        },
      });

      return response;
    } catch (error) {
      throw new Error(`Failed to create grupoMusical: ${error.message}`);
    }
  }


  async update(data: UpdateGrupoMusicalDto) {
    // Valida e converte as datas para o formato ISO 8601, se forem fornecidas
    const currentDate = new Date().toISOString();
    let dataDeCriacao: string;

    try {
      dataDeCriacao = data.dataDeCriacao ? new Date(data.dataDeCriacao).toISOString() : currentDate;
    } catch (error) {
      throw new Error('Invalid dataDeRegisto value ' + dataDeCriacao);
    }
    data.codGrupoMusical = Number(data?.codGrupoMusical);

    const response = await this.prisma.grupoMusical.update({
      where: {
        codGrupoMusical: data.codGrupoMusical,
      },
      data: {
        ...data,
        dataDeCriacao: dataDeCriacao,
      },
    });

    return response;
  }

  async remove(id: number) {
    const response = await this.prisma.grupoMusical.delete({
      where: { codGrupoMusical: id },
    });

    return response;
  }

  async getOne(id: number) {
    const response = await this.prisma.grupoMusical.findUnique({
      where: {
        codGrupoMusical: id,
      },
    });

    return response;
  }

  async getOneByName(nomeGrupoMusical: string) {
    const response = await this.prisma.grupoMusical.findFirst({
      where: {
        nomeGrupoMusical: nomeGrupoMusical,
      },
    });

    return response;
  }

  async listarGruposMusicais() {
    const response = await this.prisma.grupoMusical.findMany({
      include: {
        registadopor: {
          select: {
            username: true,
          },
        },
      },
    });
    return response;
  }



}
