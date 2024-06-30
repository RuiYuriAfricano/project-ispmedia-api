/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { AddUtilizadorDto } from './dto/addUtilizadorDto';
import { UpdateUtilizadorDto } from './dto/updateUtilizadorDto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as winattr from 'winattr'; // Import winattr to set hidden attribute
import * as nodemailer from 'nodemailer';
import * as ffmpeg from 'fluent-ffmpeg';
import { parse, format } from 'path';

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
    data.codVerificacao = this.gerarCodigoDeSeisDigitosEmFormaString();

    const utilizador = await this.prisma.utilizador.create({ data });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: "20201580@isptec.co.ao",
        pass: "yuriyuri03",
        clientId: "594940743798-8pdh0j28ujos5bclvjlbuiv1547k4b51.apps.googleusercontent.com",
        clientSecret: "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",
        refreshToken: "1//04kN3uschRCTXCgYIARAAGAQSNwF-L9Iruw3ILwxeHn-FLpXSncNoSk-G7YFvkJJ46gYajk2oUMhC3RwA0v_qfwCzp0jho7YAYcA"
      }
    });

    const mailOptions = {
      from: "20201580@isptec.co.ao",
      to: data.email, // Assuming AddUtilizadorDto has an email field
      subject: 'ISPMEDIA - Código de Verificação',
      text: data.codVerificacao
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });

    return utilizador;
  }

  gerarCodigoDeSeisDigitosEmFormaString(): string {
    // Gera um número aleatório entre 100000 e 999999
    const codigo = Math.floor(100000 + Math.random() * 900000);
    // Converte o número para uma string e retorna
    return codigo.toString();
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
    const data = { "estado": "excluido" };
    const utilizador = await this.prisma.utilizador.update({
      where: {
        codUtilizador: id,
      },
      data,
    });

    return utilizador;
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
  async convertAndResizeImageToJPG(imagePath: string): Promise<string> {
    const parsedPath = parse(imagePath);
    const outputDir = parsedPath.dir;
    const outputPath = format({
      dir: outputDir,
      name: parsedPath.name + '-compressed',
      ext: '.jpg'
    });

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    return new Promise<string>((resolve, reject) => {
      ffmpeg(imagePath)
        .outputOptions([
          '-vf scale=128:128', // Resize to 128x128 pixels
          '-q:v 5', // Quality level
          '-format jpeg', // Convert to JPEG
          '-map_metadata -1' // Remove all metadata
        ])
        .save(outputPath)
        .on('end', () => {
          console.log(`Image conversion and resizing finished: ${outputPath}`);
          resolve(outputPath);
        })
        .on('error', (err) => {
          console.error(`Failed to convert and resize image: ${err.message}`);
          reject(new Error(`Failed to convert and resize image: ${err.message}`));
        });
    });
  }
}
