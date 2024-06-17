import { Injectable, NotFoundException } from '@nestjs/common';
import { AddConteudoDosGruposDto } from './dto/addConteudoDosGruposDto';
import { UpdateConteudoDosGruposDto } from './dto/updateConteudoDosGruposDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ConteudoDosGruposService {
  constructor(private prisma: PrismaService) { }

  async add(data: AddConteudoDosGruposDto) {
    try {
      const response = await this.prisma.conteudosDosGrupos.create({
        data,
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to add conteudo to group: ${error.message}`);
    }
  }

  async update(data: UpdateConteudoDosGruposDto) {
    try {
      const response = await this.prisma.conteudosDosGrupos.update({
        where: {
          codConteudo: data.codConteudo,
        },
        data,
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to update conteudo in group: ${error.message}`);
    }
  }

  async updatePorFk(data: UpdateConteudoDosGruposDto) {
    try {
      const conteudoDoGrupo = await this.prisma.conteudosDosGrupos.findFirst({
        where: {
          fkGrupoDeAmigos: data.fkGrupoDeAmigos,
          OR: [
            data.fkMusica !== null && { fkMusica: data.fkMusica },
            data.fkAlbum !== null && { fkAlbum: data.fkAlbum },
            data.fkVideo !== null && { fkVideo: data.fkVideo }
          ].filter(Boolean) // Filtra para remover valores nulos
        }
      });

      if (!conteudoDoGrupo) {
        throw new Error(`conteudoDoGrupo not found for fkGrupoDeAmigos ${data.fkGrupoDeAmigos}`);
      }

      const response = await this.prisma.conteudosDosGrupos.update({
        where: {
          codConteudo: conteudoDoGrupo.codConteudo // Utilizando o ID do primeiro resultado encontrado
        },
        data,
      });

      return response;
    } catch (error) {
      throw new Error(`Failed to update conteudo in group: ${error.message}`);
    }
  }


  async remove(id: number) {
    const response = await this.prisma.conteudosDosGrupos.delete({
      where: { codConteudo: id, },
    });
    return response;
  }

  async getOne(id: number) {
    const response = await this.prisma.conteudosDosGrupos.findUnique({
      where: { codConteudo: id },
    });

    if (!response) {
      throw new NotFoundException(`Conteudo in playlist with ID ${id} not found`);
    }

    return response;
  }

  async listarConteudoDosGrupos() {
    const response = await this.prisma.conteudosDosGrupos.findMany({
      include: {
        grupoDeAmigos: true,
        musica: true,
        video: true,
        album: true,
      },
    });

    return response;
  }
}
