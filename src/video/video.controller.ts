import { Controller, Get, Post, UseInterceptors, Res, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { VideoService } from './video.service';
import { AddVideoDto } from './dto/addVideoDto';
import { UpdateVideoDto } from './dto/updateVideoDto';
import { diskStorage } from 'multer';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as fs from 'fs-extra';


@Controller('video')
export class VideoController {
  constructor(private videoService: VideoService) { }

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 1, {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const uploadPath = 'uploadvideos';
          fs.ensureDirSync(uploadPath);
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  add(@Body() data: AddVideoDto) {
    return this.videoService.add({
      ...data,
      "fkUtilizador": Number(data.fkUtilizador),
      "fkArtista": Number(data.fkArtista) || null,
      "fkGrupoMusical": Number(data.fkGrupoMusical) || null,
    });
  }

  @Put()
  @UseInterceptors(
    FilesInterceptor('files', 1, {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const uploadPath = 'uploadvideos';
          fs.ensureDirSync(uploadPath);
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  update(@Body() data: UpdateVideoDto) {
    return this.videoService.update({
      ...data,
      "codVideo": Number(data.codVideo),
      "fkUtilizador": Number(data.fkUtilizador),
      "fkArtista": Number(data.fkArtista) || null,
      "fkGrupoMusical": Number(data.fkGrupoMusical) || null,
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.videoService.remove(id);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.videoService.getOne(id);
  }

  @Post('listarVideos')
  listarVideos() {
    return this.videoService.listarVideos();
  }

  @Get('downloadVideo/:id')
  async downloadMusica(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const filePath = await this.videoService.downloadVideo(id);
    return res.sendFile(filePath);
  }
}
