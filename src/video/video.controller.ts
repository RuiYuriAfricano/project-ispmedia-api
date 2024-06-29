import { Controller, Get, Post, UseInterceptors, NotFoundException, Res, Put, Delete, Body, Param, ParseIntPipe, Headers } from '@nestjs/common';
import { VideoService } from './video.service';
import { AddVideoDto } from './dto/addVideoDto';
import { UpdateVideoDto } from './dto/updateVideoDto';
import { diskStorage } from 'multer';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as fs from 'fs-extra';
import * as path from 'path';

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
  async add(@Body() data: AddVideoDto) {
    const videoData = {
      ...data,
      "fkUtilizador": Number(data.fkUtilizador),
      "fkArtista": Number(data.fkArtista) || null,
      "fkGrupoMusical": Number(data.fkGrupoMusical) || null,
    };

    const response = await this.videoService.add(videoData);

    // Compress the video and remove metadata
    const videoPath = path.join('uploadvideos', data.ficheiroDoVideo);
    const compressedVideoPath = await this.videoService.processVideo(videoPath);
    // Obtém apenas o nome do arquivo e a extensão
    const fileName = path.basename(compressedVideoPath);

    const videoData2 = new UpdateVideoDto()
    videoData2.ficheiroDoVideo = fileName;
    videoData2.codVideo = response.codVideo;
    videoData2.dataLancamento = response.dataLancamento;

    // Update the video with the new file path
    await this.videoService.update(videoData2);

    return response;
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

  @Get('listarVideosPorPagina/:page/:pageSize')
  listarVideosPorPagina(
    @Param('page', ParseIntPipe) page: number,
    @Param('pageSize', ParseIntPipe) pageSize: number
  ) {
    return this.videoService.listarVideosPorPagina(page, pageSize);
  }

  @Get('downloadVideo/:id')
  async downloadVideo(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
    @Headers() headers
  ) {
    if (headers.referer !== 'https://localhost:3000/') {

      return res.status(403).send('Forbidden');
    }

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
  async getThumbnail(@Param('id') id: string, @Res() res: Response, @Headers() headers) {
    if (headers.referer !== 'https://localhost:3000/') {
      return res.status(403).send('Forbidden');
    }

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
