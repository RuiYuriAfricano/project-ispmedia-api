/* eslint-disable prettier/prettier */
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
  Headers,
} from '@nestjs/common';
import { UtilizadorService } from './utilizador.service';
import { AddUtilizadorDto } from './dto/addUtilizadorDto';
import { UpdateUtilizadorDto } from './dto/updateUtilizadorDto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import * as path from 'path';

@Controller('utilizador')
export class UtilizadorController {
  constructor(private utilizadorService: UtilizadorService) { }

  @Post('login')
  login(@Body('username') username: string, @Body('senha') senha: string) {
    return this.utilizadorService.login(username, senha);
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: (req, file, callback) => {
          callback(null, 'upload/');
        },
        filename: (req, file, callback) => {
          callback(
            null,
            file.originalname
          );
        }
      })
    })
  )
  async add(@Body() data: AddUtilizadorDto,
    @UploadedFile() file: Express.Multer.File) {

    const response = this.utilizadorService.add(data);


    if (data.fotografia === "") {
      return response;
    }

    const utilizadorData = new UpdateUtilizadorDto()


    // Compress the img da capa and remove metadata
    const imgPath = path.join('upload', data.fotografia);
    const compressedImgPath = await this.utilizadorService.convertAndResizeImageToJPG(imgPath);
    // Obtém apenas o nome do arquivo e a extensão
    const fileName = path.basename(compressedImgPath);
    utilizadorData.fotografia = fileName;
    utilizadorData.codUtilizador = (await response).codUtilizador;
    // Update the video with the new file path
    await this.utilizadorService.update(utilizadorData);


    return response;
  }

  @Put()
  update(@Body() data: UpdateUtilizadorDto) {
    return this.utilizadorService.update({
      ...data,
      "codUtilizador": Number(data.codUtilizador)
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.utilizadorService.remove(id);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.utilizadorService.getOne(id);
  }

  @Post('pesquisapornome')
  getOneByName(@Body('username') username: string) {
    return this.utilizadorService.getOneByName(username);
  }

  // Exemplo de chamada do método downloadFoto no UtilizadorController
  @Get('download/:username')
  async downloadFoto(@Param('username') username: string, @Res() res: Response
    , @Headers() headers
  ) {

    if (headers.referer !== 'http://localhost:3000/') {
      return res.status(403).send('Forbidden');
    }
    const filePath = await this.utilizadorService.downloadFoto(username);
    return res.sendFile(filePath);
  }

  @Post('listar')
  listarUtilizadores() {
    return this.utilizadorService.listarUtilizadores();
  }
}
