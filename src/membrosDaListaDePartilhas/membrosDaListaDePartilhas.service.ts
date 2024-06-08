import { Injectable, NotFoundException } from '@nestjs/common';
import { AddMembrosDaListaDePartilhasDto } from './dto/addMembrosDaListaDePartilhasDto';
import { UpdateMembrosDaListaDePartilhasDto } from './dto/updateMembrosDaListaDePartilhasDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MembrosDaListaDePartilhasService {
  constructor(private prisma: PrismaService) { }

  async add(data: AddMembrosDaListaDePartilhasDto) {
    try {
      const response = await this.prisma.membrosDaListaDePartilhas.create({
        data,
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to add member to sharing list: ${error.message}`);
    }
  }

  async update(data: UpdateMembrosDaListaDePartilhasDto) {
    try {
      const response = await this.prisma.membrosDaListaDePartilhas.update({
        where: {
          codMembroLista: data.codMembroLista,
        },
        data,
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to update member in sharing list: ${error.message}`);
    }
  }

  async remove(id: number) {
    const response = await this.prisma.membrosDaListaDePartilhas.delete({
      where: { codMembroLista: id },
    });
    return response;
  }

  async getOne(id: number) {
    const response = await this.prisma.membrosDaListaDePartilhas.findUnique({
      where: { codMembroLista: id },
    });

    if (!response) {
      throw new NotFoundException(`Member with ID ${id} not found in sharing list`);
    }

    return response;
  }

  async listarMembrosDaListaDePartilhas() {
    const response = await this.prisma.membrosDaListaDePartilhas.findMany({
      include: {
        grupoDeAmigos: {
          select: {
            nomeDoGrupo: true,
          },
        },
        listaDePartilha: {
          select: {
            nomeDaLista: true,
          },
        },
      },
    });

    return response;
  }
}
