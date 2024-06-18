import { Controller, Get, Post, UseInterceptors, NotFoundException, Res, Put, Delete, Body, Param, ParseIntPipe, Headers } from '@nestjs/common';
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
  async downloadVideo(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
    @Headers() headers
  ) {
    const range = headers.range;

    try {
      const { headers: videoHeaders, filePath, start, end } = await this.videoService.downloadVideo(id, range);
      const videoStream = fs.createReadStream(filePath, { start, end });

      res.writeHead(range ? 206 : 200, videoHeaders);
      videoStream.pipe(res);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  @Get(':id/thumbnail')
  async getThumbnail(@Param('id') id: string, @Res() res: Response) {
    try {
      const videoId = parseInt(id, 10);
      if (isNaN(videoId)) {
        throw new NotFoundException('Invalid video ID');
      }
      const thumbnailPath = await this.videoService.getThumbnail(videoId);
      if (!fs.existsSync(thumbnailPath)) {
        throw new NotFoundException('Thumbnail not found');
      }
      res.sendFile(thumbnailPath);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

}
