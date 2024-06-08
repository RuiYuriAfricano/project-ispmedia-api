import { Injectable, NotFoundException } from '@nestjs/common';
import { AddPartilhaDeConteudoDto } from './dto/addPartilhaDeConteudoDto';
import { UpdatePartilhaDeConteudoDto } from './dto/updatePartilhaDeConteudoDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PartilhaDeConteudoService {
  constructor(private prisma: PrismaService) { }

  async add(data: AddPartilhaDeConteudoDto) {
    try {
      const response = await this.prisma.partilhaDeConteudo.create({
        data: {
          ...data,
          dataDePartilha: new Date().toISOString(), // Use the current date as dataDepartilha
        },
      });

      return response;
    } catch (error) {
      throw new Error(`Failed to create PartilhaDeConteudo: ${error.message}`);
    }
  }

  async update(data: UpdatePartilhaDeConteudoDto) {
    try {
      const response = await this.prisma.partilhaDeConteudo.update({
        where: {
          codPartilha: data.codPartilha,
        },
        data: {
          ...data,
        },
      });

      return response;
    } catch (error) {
      throw new Error(`Failed to update PartilhaDeConteudo: ${error.message}`);
    }
  }

  async remove(id: number) {
    const response = await this.prisma.partilhaDeConteudo.delete({
      where: { codPartilha: id },
    });

    return response;
  }

  async getOne(id: number) {
    const response = await this.prisma.partilhaDeConteudo.findUnique({
      where: { codPartilha: id },
    });

    if (!response) {
      throw new NotFoundException(`Partilha de Conteudo with ID ${id} not found`);
    }

    return response;
  }

  async listarPartilhaDeConteudo() {
    const response = await this.prisma.partilhaDeConteudo.findMany({
      include: {
        utilizador: true,
        album: true,
        musica: true,
        video: true,
        grupoDeAmigos: true,
      },
    },
    );

    return response;
  }

}
