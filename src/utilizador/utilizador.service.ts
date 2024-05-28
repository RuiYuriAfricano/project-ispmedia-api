/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AddUtilizadorDto } from './dto/addUtilizadorDto';
import { UpdateUtilizadorDto } from './dto/updateUtilizadorDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UtilizadorService {
  constructor(private prisma: PrismaService) { }


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
    const utilizador = await this.prisma.utilizador.create({
      data,
    });
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



}
