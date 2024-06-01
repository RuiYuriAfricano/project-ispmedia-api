import { Controller, Get, Post, Put, Res, Delete, Body, Param, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { MusicaService } from './musica.service';
import { AddMusicaDto } from './dto/addMusicaDto';
import { UpdateMusicaDto } from './dto/updateMusicaDto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import * as fs from 'fs-extra';
@Controller('musica')
export class MusicaController {
  constructor(private musicaService: MusicaService) { }

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 2, {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const uploadPath = 'uploadmusicas';
          fs.ensureDirSync(uploadPath);
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  add(@Body() data: AddMusicaDto) {
    return this.musicaService.add({
      ...data,
      "fkUtilizador": Number(data.fkUtilizador),
      "fkAlbum": Number(data.fkAlbum) || null,
      "fkArtista": Number(data.fkArtista) || null,
      "fkGrupoMusical": Number(data.fkGrupoMusical) || null,
    });
  }

  @Put()
  @UseInterceptors(
    FilesInterceptor('files', 2, {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const uploadPath = 'uploadmusicas';
          fs.ensureDirSync(uploadPath);
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  update(@Body() data: UpdateMusicaDto) {
    return this.musicaService.update({
      ...data,
      "codMusica": Number(data.codMusica),
      "fkUtilizador": Number(data.fkUtilizador),
      "fkAlbum": Number(data.fkAlbum) || null,
      "fkArtista": Number(data.fkArtista) || null,
      "fkGrupoMusical": Number(data.fkGrupoMusical) || null
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.musicaService.remove(id);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.musicaService.getOne(id);
  }

  @Get('listarMusicas')
  listarMusicas() {
    return this.musicaService.listarMusicas();
  }

  @Get('downloadCapa/:id')
  async downloadCapa(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const filePath = await this.musicaService.downloadCapa(id);
    return res.sendFile(filePath);
  }

  @Get('downloadMusica/:id')
  async downloadMusica(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const filePath = await this.musicaService.downloadMusica(id);
    return res.sendFile(filePath);
  }
}
