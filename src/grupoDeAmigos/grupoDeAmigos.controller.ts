import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { GrupoDeAmigosService } from './grupoDeAmigos.service';
import { AddGrupoDeAmigosDto } from './dto/addGrupoDeAmigosDto';
import { UpdateGrupoDeAmigosDto } from './dto/updateGrupoDeAmigosDto';

@Controller('grupo-de-amigos')
export class GrupoDeAmigosController {
  constructor(private grupoDeAmigosService: GrupoDeAmigosService) { }

  @Post()
  add(@Body() data: AddGrupoDeAmigosDto) {
    return this.grupoDeAmigosService.add(data);
  }

  @Put()
  update(@Body() data: UpdateGrupoDeAmigosDto) {
    return this.grupoDeAmigosService.update(data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.grupoDeAmigosService.remove(id);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.grupoDeAmigosService.getOne(id);
  }

  @Post('listarGruposDeAmigos')
  listarGruposDeAmigos() {
    return this.grupoDeAmigosService.listarGruposDeAmigos();
  }
}
