import { Injectable, NotFoundException } from '@nestjs/common';
import { AddMembrosDosGruposDto } from './dto/addMembrosDosGruposDto';
import { UpdateMembrosDosGruposDto } from './dto/updateMembrosDosGruposDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MembrosDosGruposService {
  constructor(private prisma: PrismaService) { }

  async add(data: AddMembrosDosGruposDto) {
    try {
      const response = await this.prisma.membrosDosGrupos.create({
        data,
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to add member to group: ${error.message}`);
    }
  }

  async update(data: UpdateMembrosDosGruposDto) {
    try {
      const response = await this.prisma.membrosDosGrupos.update({
        where: {
          codMembro: data.codMembro,
        },
        data,
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to update member in group: ${error.message}`);
    }
  }

  async remove(id: number) {
    const response = await this.prisma.membrosDosGrupos.delete({
      where: { codMembro: id },
    });
    return response;
  }

  async getOne(id: number) {
    const response = await this.prisma.membrosDosGrupos.findUnique({
      where: { codMembro: id },
    });

    if (!response) {
      throw new NotFoundException(`Member with ID ${id} not found in group`);
    }

    return response;
  }

  async listarMembrosDosGrupos() {
    const response = await this.prisma.membrosDosGrupos.findMany({
      include: {
        utilizador: {
          select: {
            username: true,
          },
        },
        grupoDeAmigos: {
          select: {
            nomeDoGrupo: true,
          },
        },
      },
    });

    return response;
  }
}
