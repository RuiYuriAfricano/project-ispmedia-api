import { Injectable, NotFoundException } from '@nestjs/common';
import { AddAlbumDto } from './dto/addAlbumDto';
import { UpdateAlbumDto } from './dto/updateAlbumDto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as winattr from 'winattr'; // Import winattr to set hidden attribute

@Injectable()
export class AlbumService {
  private readonly CAPA_FOLDER = path.resolve(__dirname, '..', '..', 'upload', 'capas');

  constructor(private prisma: PrismaService) {
    // Verifica se a pasta de capas existe, se não, cria-a
    if (!fs.existsSync(this.CAPA_FOLDER)) {
      fs.mkdirSync(this.CAPA_FOLDER, { recursive: true });
    }
  }

  async add(data: AddAlbumDto) {
    const currentDate = new Date().toISOString();
    let dataLancamento: string;
    let dataDeRegistro: string;

    try {
      dataLancamento = new Date(data.dataLancamento).toISOString();
      dataDeRegistro = currentDate;
    } catch (error) {
      throw new Error('Invalid date value');
    }

    try {
      const response = await this.prisma.album.create({
        data: {
          ...data,
          dataLancamento,
          dataDeRegistro,
        },
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to create album: ${error.message}`);
    }
  }

  async update(data: UpdateAlbumDto) {
    let dataLancamento: string;

    try {
      dataLancamento = new Date(data.dataLancamento).toISOString();
    } catch (error) {
      throw new Error('Invalid date value');
    }

    try {
      const response = await this.prisma.album.update({
        where: { codAlbum: data.codAlbum },
        data: {
          ...data,
          dataLancamento,
        },
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to update album: ${error.message}`);
    }
  }

  async remove(id: number) {
    const response = await this.prisma.album.delete({
      where: { codAlbum: id },
    });
    return response;
  }

  async getOne(id: number) {
    const response = await this.prisma.album.findUnique({
      where: { codAlbum: id },
    });
    if (!response) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return response;
  }

  async listarAlbuns() {
    const response = await this.prisma.album.findMany({
      include: {
        artista: true,
        grupoMusical: true,
        registadopor: true,
      },
    });
    return response;
  }

  async pesquisaPorTitulo(titulo: string) {
    const response = await this.prisma.album.findMany({
      where: {
        tituloAlbum: {
          contains: titulo,
        },
      },
      include: {
        artista: true,
        grupoMusical: true,
        registadopor: true,
      },
    });
    return response;
  }

  async downloadCapa(id: number, destination: string) {
    const album = await this.prisma.album.findUnique({
      where: { codAlbum: id },
    });
    if (album === null) {
      throw new NotFoundException('Capa não encontrada para este álbum');
    }

    const filePath = path.join(__dirname, '..', '..', 'uploadcapas', album.capaAlbum);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Capa não encontrada no sistema de arquivos');
    }

    const destinationPath = path.join(destination, album.capaAlbum);

    // Verificar se o diretório de destino existe, se não existir, criar
    await fs.ensureDir(path.dirname(destinationPath));

    // Copiar o arquivo para o destino
    await fs.copyFile(filePath, destinationPath);

    // Ocultar o diretório de destino
    const destinationDir = path.dirname(destinationPath);
    winattr.set(destinationDir, { hidden: true }, (err) => {
      if (err) throw err;
    });
    console.log("Path:", destinationPath)
    return destinationPath;
  }
}
