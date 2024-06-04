import { Controller, Get, Post, Put, Res, Delete, Body, HttpException, HttpStatus, Param, Headers, ParseIntPipe, UseInterceptors } from '@nestjs/common';
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

  @Post('listarMusicas')
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
  async downloadMusic(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
    @Headers() headers
  ) {
    const range = headers.range;

    try {
      const { headers: musicHeaders, filePath, start, end } = await this.musicaService.downloadMusic(Number(id), range);
      const musicStream = fs.createReadStream(filePath, { start, end });

      res.writeHead(range ? 206 : 200, musicHeaders);
      musicStream.pipe(res);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
