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
import { GrupoMusicalService } from './grupoMusical.service';
import { AddGrupoMusicalDto } from './dto/addGrupoMusicalDto';
import { UpdateGrupoMusicalDto } from './dto/updateGrupoMusicalDto';


@Controller('grupoMusical')
export class GrupoMusicalController {
  constructor(private grupoMusical: GrupoMusicalService) { }

  @Post()
  add(@Body() data: AddGrupoMusicalDto) {
    return this.grupoMusical.add(data);
  }

  @Put()
  update(@Body() data: UpdateGrupoMusicalDto) {
    return this.grupoMusical.update(data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.grupoMusical.remove(id);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.grupoMusical.getOne(id);
  }

  @Post('pesquisapornome')
  getOneByName(@Body('nomeGrupoMusical') nomeGrupoMusical: string) {
    return this.grupoMusical.getOneByName(nomeGrupoMusical);
  }

  @Post('listarGruposMusicais')
  listarGruposMusicais() {
    return this.grupoMusical.listarGruposMusicais();
  }

}
