import { Injectable, NotFoundException } from '@nestjs/common';
import { AddGrupoDeAmigosDto } from './dto/addGrupoDeAmigosDto';
import { UpdateGrupoDeAmigosDto } from './dto/updateGrupoDeAmigosDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GrupoDeAmigosService {
  constructor(private prisma: PrismaService) { }

  async add(data: AddGrupoDeAmigosDto) {
    try {
      data.dataDeCriacao = new Date().toISOString();
      const response = await this.prisma.grupoDeAmigos.create({
        data,
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to create group of friends: ${error.message}`);
    }
  }

  async update(data: UpdateGrupoDeAmigosDto) {
    try {
      const response = await this.prisma.grupoDeAmigos.update({
        where: {
          codGrupoDeAmigos: data.codGrupoDeAmigos,
        },
        data,
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to update group of friends: ${error.message}`);
    }
  }

  async remove(id: number) {
    const response = await this.prisma.grupoDeAmigos.delete({
      where: { codGrupoDeAmigos: id },
    });
    return response;
  }

  async getOne(id: number) {
    const response = await this.prisma.grupoDeAmigos.findUnique({
      where: { codGrupoDeAmigos: id },
    });

    if (!response) {
      throw new NotFoundException(`Group of friends with ID ${id} not found`);
    }

    return response;
  }

  async listarGruposDeAmigos() {
    const response = await this.prisma.grupoDeAmigos.findMany({
      include: {
        utilizador: {
          select: {
            username: true,
          },
        },
        membrosDosGrupos: true,
        membrosDaListaDePartilhas: true,
      },
    });

    return response;
  }
}
