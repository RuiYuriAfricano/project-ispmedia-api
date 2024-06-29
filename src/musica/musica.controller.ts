import { Controller, Get, Post, Put, Res, Delete, Body, HttpException, HttpStatus, Param, Headers, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { MusicaService } from './musica.service';
import { AddMusicaDto } from './dto/addMusicaDto';
import { UpdateMusicaDto } from './dto/updateMusicaDto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as ffmpeg from 'fluent-ffmpeg';
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
  async add(@Body() data: AddMusicaDto) {
    const response = this.musicaService.add({
      ...data,
      "fkUtilizador": Number(data.fkUtilizador),
      "fkAlbum": Number(data.fkAlbum) || null,
      "fkArtista": Number(data.fkArtista) || null,
      "fkGrupoMusical": Number(data.fkGrupoMusical) || null,
    });

    // Compress the audio and remove metadata
    const musicaPath = path.join('uploadmusicas', data.ficheiroMusical);
    const compressedAudioPath = await this.musicaService.convertAudioToMP3(musicaPath);
    // Obtém apenas o nome do arquivo e a extensão
    let fileName = path.basename(compressedAudioPath);

    const audioData2 = new UpdateMusicaDto()
    audioData2.ficheiroMusical = fileName;
    audioData2.codMusica = (await response).codMusica;
    audioData2.dataLancamento = (await response).dataLancamento;

    // Compress the img da capa and remove metadata
    const imgPath = path.join('uploadmusicas', data.capaMusica);
    const compressedImgPath = await this.musicaService.convertAndResizeImageToJPG(imgPath);
    // Obtém apenas o nome do arquivo e a extensão
    fileName = path.basename(compressedImgPath);
    audioData2.capaMusica = fileName;

    // Update the video with the new file path
    await this.musicaService.update(audioData2);
    return response;
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

  @Get('listarMusicasPorPagina/:page/:pageSize')
  listarMusicasPorPagina(
    @Param('page', ParseIntPipe) page: number,
    @Param('pageSize', ParseIntPipe) pageSize: number
  ) {
    return this.musicaService.listarMusicasPorPagina(page, pageSize);
  }

  @Get('downloadCapa/:id')
  async downloadCapa(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
    @Headers() headers
  ) {

    if (headers.referer !== 'https://localhost:3000/') {
      return res.status(403).send('Forbidden');
    }

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

    if (headers.referer !== 'https://localhost:3000/') {
      return res.status(403).send('Forbidden');
    }

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
