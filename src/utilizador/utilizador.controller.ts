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
} from '@nestjs/common';
import { UtilizadorService } from './utilizador.service';
import { AddUtilizadorDto } from './dto/addUtilizadorDto';
import { UpdateUtilizadorDto } from './dto/updateUtilizadorDto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';

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
  add(@Body() data: AddUtilizadorDto,
    @UploadedFile() file: Express.Multer.File) {
    return this.utilizadorService.add(data);
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
  async downloadFoto(@Param('username') username: string, @Res() res: Response) {
    const filePath = await this.utilizadorService.downloadFoto(username);
    return res.sendFile(filePath);
  }

  @Post('listar')
  listarUtilizadores() {
    return this.utilizadorService.listarUtilizadores();
  }
}
