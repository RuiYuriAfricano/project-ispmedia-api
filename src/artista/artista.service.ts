import { Injectable, NotFoundException } from '@nestjs/common';
import { AddArtistaDto } from './dto/addArtistaDto';
import { UpdateArtistaDto } from './dto/updateArtistaDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistaService {
  constructor(private prisma: PrismaService) { }

  async add(data: AddArtistaDto) {
    try {
      const response = await this.prisma.artista.create({
        data: {
          ...data,
          dataDeRegisto: new Date().toISOString(), // Use the current date as dataDeRegisto
        },
      });

      return response;
    } catch (error) {
      throw new Error(`Failed to create artista: ${error.message}`);
    }
  }

  async update(data: UpdateArtistaDto) {
    try {
      const response = await this.prisma.artista.update({
        where: {
          codArtista: data.codArtista,
        },
        data: {
          ...data
        },
      });

      return response;
    } catch (error) {
      throw new Error(`Failed to update artista: ${error.message}`);
    }
  }

  async remove(id: number) {
    const response = await this.prisma.artista.delete({
      where: { codArtista: id },
    });

    return response;
  }

  async getOne(id: number) {
    const response = await this.prisma.artista.findUnique({
      where: { codArtista: id },
    });

    if (!response) {
      throw new NotFoundException(`Artista with ID ${id} not found`);
    }

    return response;
  }

  async getOneByName(nomeArtista: string) {
    const response = await this.prisma.artista.findFirst({
      where: { nomeArtista: nomeArtista },
    });

    if (!response) {
      throw new NotFoundException(`Artista with name ${nomeArtista} not found`);
    }

    return response;
  }

  async listarArtistas() {
    const response = await this.prisma.artista.findMany({
      include: {
        registadopor: {
          select: {
            username: true,
          },
        },
        grupoMusical: {
          select: {
            nomeGrupoMusical: true,
          },
        },
      },
    });

    return response;
  }

}
