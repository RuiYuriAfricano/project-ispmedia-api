import { Injectable, NotFoundException } from '@nestjs/common';
import { AddListaDePartilhaDto } from './dto/addListaDePartilhaDto';
import { UpdateListaDePartilhaDto } from './dto/updateListaDePartilhaDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ListaDePartilhaService {
  constructor(private prisma: PrismaService) { }

  async add(data: AddListaDePartilhaDto) {
    try {
      const response = await this.prisma.listaDePartilha.create({
        data,
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to create sharing list: ${error.message}`);
    }
  }

  async update(data: UpdateListaDePartilhaDto) {
    try {
      const response = await this.prisma.listaDePartilha.update({
        where: {
          codListaDePartilha: data.codListaDePartilha,
        },
        data,
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to update sharing list: ${error.message}`);
    }
  }

  async remove(id: number) {
    const response = await this.prisma.listaDePartilha.delete({
      where: { codListaDePartilha: id },
    });
    return response;
  }

  async getOne(id: number) {
    const response = await this.prisma.listaDePartilha.findUnique({
      where: { codListaDePartilha: id },
    });

    if (!response) {
      throw new NotFoundException(`Sharing list with ID ${id} not found`);
    }

    return response;
  }

  async listarListasDePartilha() {
    const response = await this.prisma.listaDePartilha.findMany({
      include: {
        utilizador: {
          select: {
            username: true,
          },
        },
        membrosDaListaDePartilhas: true,
      },
    });

    return response;
  }
}
