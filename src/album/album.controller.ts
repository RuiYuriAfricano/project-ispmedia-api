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
  Query,
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
          const uploadPath = 'uploadcapas';
          fs.ensureDirSync(uploadPath);
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  add(@Body() data: AddAlbumDto, @UploadedFile() file: Express.Multer.File) {
    return this.albumService.add({
      ...data,
      "fkUtilizador": Number(data.fkUtilizador),
      "fkArtista": Number(data.fkArtista) || null,
      "fkGrupoMusical": Number(data.fkGrupoMusical) || null
    });
  }

  @Put()
  @UseInterceptors(
    FilesInterceptor('files', 1, {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const uploadPath = 'uploadcapas';
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

  @Get('pesquisaPorTitulo/:tituloAlbum')
  pesquisaPorTitulo(@Param('tituloAlbum') titulo: string) {
    return this.albumService.pesquisaPorTitulo(titulo);
  }

  @Get('downloadCapa/:id')
  async downloadCapa(
    @Param('id', ParseIntPipe) id: number,
    @Query('destination') destination: string,
    @Res() res: Response,
  ) {
    const filePath = await this.albumService.downloadCapa(id, destination);
    return res.sendFile(filePath);
  }
}
