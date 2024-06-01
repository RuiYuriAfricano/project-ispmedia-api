/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { AddUtilizadorDto } from './dto/addUtilizadorDto';
import { UpdateUtilizadorDto } from './dto/updateUtilizadorDto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as winattr from 'winattr'; // Import winattr to set hidden attribute

@Injectable()
export class UtilizadorService {
  private readonly AVATAR_FOLDER = path.resolve(__dirname, '..', '..', 'conta-usuario');
  constructor(private prisma: PrismaService) {
    // Verifica se a pasta de avatares existe, se não, cria-a
    if (!fs.existsSync(this.AVATAR_FOLDER)) {
      fs.mkdirSync(this.AVATAR_FOLDER, { recursive: true });
    }
  }


  async login(username: string, senha: string) {
    // Validar as credenciais
    const utilizador = await this.prisma.utilizador.findFirst({
      where: {
        username: username,
        senha: senha,
      },
    });

    if (!utilizador) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return utilizador;
  }

  async add(data: AddUtilizadorDto) {
    const utilizador = await this.prisma.utilizador.create({ data });
    return utilizador;
  }


  async update(data: UpdateUtilizadorDto) {
    data.codUtilizador = Number(data?.codUtilizador);

    const utilizador = await this.prisma.utilizador.update({
      where: {
        codUtilizador: data.codUtilizador,
      },
      data,
    });

    return utilizador;
  }

  async remove(id: number) {
    const response = await this.prisma.utilizador.delete({
      where: { codUtilizador: id },
    });

    return response;
  }

  async getOne(id: number) {
    const utilizador = await this.prisma.utilizador.findUnique({
      where: {
        codUtilizador: id,
      },
    });

    return utilizador;
  }

  async getOneByName(username: string) {
    const utilizador = await this.prisma.utilizador.findUnique({
      where: {
        username: username,
      },
    });

    return utilizador;
  }

  async listarUtilizadores() {
    const utilizadores = await this.prisma.utilizador.findMany();
    return utilizadores;
  }

  async downloadFoto(username: string) {
    const utilizador = await this.prisma.utilizador.findUnique({
      where: {
        username: username,
      },
    });

    if (!utilizador || !utilizador.fotografia) {
      throw new NotFoundException('Foto não encontrada para este usuário');
    }

    const filePath = path.join(__dirname, '..', '..', 'upload', utilizador.fotografia);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Foto não encontrada no sistema de arquivos');
    }



    return filePath;
  }



}
