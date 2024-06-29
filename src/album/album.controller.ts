import {
  Get,
  Put,
  Post,
  Body,
  Param,
  Delete,
  Controller,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  Res,
  Headers,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { AddAlbumDto } from './dto/addAlbumDto';
import { UpdateAlbumDto } from './dto/updateAlbumDto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import * as fs from 'fs-extra';
import * as path from 'path';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) { }

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 1, {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const uploadPath = 'uploadcapasalbum';
          fs.ensureDirSync(uploadPath);
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  async add(@Body() data: AddAlbumDto, @UploadedFile() file: Express.Multer.File) {
    const response = this.albumService.add({
      ...data,
      "fkUtilizador": Number(data.fkUtilizador),
      "fkArtista": Number(data.fkArtista) || null,
      "fkGrupoMusical": Number(data.fkGrupoMusical) || null
    });

    const albumData = new UpdateAlbumDto()


    // Compress the img da capa and remove metadata
    const imgPath = path.join('uploadcapasalbum', data.capaAlbum);
    const compressedImgPath = await this.albumService.convertAndResizeImageToJPG(imgPath);
    // Obtém apenas o nome do arquivo e a extensão
    const fileName = path.basename(compressedImgPath);
    albumData.capaAlbum = fileName;
    albumData.codAlbum = (await response).codAlbum;
    albumData.dataLancamento = (await response).dataLancamento;
    // Update the video with the new file path
    await this.albumService.update(albumData);

    return response;
  }

  @Put()
  @UseInterceptors(
    FilesInterceptor('files', 1, {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const uploadPath = 'uploadcapasalbum';
          fs.ensureDirSync(uploadPath);
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  update(
    @Body() data: UpdateAlbumDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const updateData = {
      ...data,
      codAlbum: Number(data.codAlbum),
      fkUtilizador: Number(data.fkUtilizador),
      fkArtista: Number(data.fkArtista) || null,
      fkGrupoMusical: Number(data.fkGrupoMusical) || null,
    };

    if (file) {
      // Se um arquivo foi enviado, atualize o caminho da capa do álbum
      updateData.capaAlbum = file.filename;
    }

    return this.albumService.update(updateData);
  }


  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.albumService.remove(id);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.albumService.getOne(id);
  }

  @Post('listarAlbuns')
  listarAlbuns() {
    return this.albumService.listarAlbuns();
  }

  @Get('listarAlbunsPorPagina/:page/:pageSize')
  listarAlbunsPorPagina(
    @Param('page', ParseIntPipe) page: number,
    @Param('pageSize', ParseIntPipe) pageSize: number
  ) {
    return this.albumService.listarAlbunsPorPagina(page, pageSize);
  }

  @Get('pesquisaPorTitulo/:tituloAlbum')
  pesquisaPorTitulo(@Param('tituloAlbum') titulo: string) {
    return this.albumService.pesquisaPorTitulo(titulo);
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
    const filePath = await this.albumService.downloadCapa(id);
    return res.sendFile(filePath);
  }

  // Método para pesquisar músicas e vídeos por título
  @Post('pesquisar')
  async pesquisarVideosMusicasEAlbunsDoGrupoPorTitulo(@Body() body: { palavraChave: string }) {
    try {
      const resultados = await this.albumService.pesquisarMusicasVideosEAlbumPorTitulo(body.palavraChave);
      return { success: true, data: resultados };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
