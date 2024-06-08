import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { MembrosDaListaDePartilhasService } from './membrosDaListaDePartilhas.service';
import { AddMembrosDaListaDePartilhasDto } from './dto/addMembrosDaListaDePartilhasDto';
import { UpdateMembrosDaListaDePartilhasDto } from './dto/updateMembrosDaListaDePartilhasDto';

@Controller('membros-da-lista-de-partilhas')
export class MembrosDaListaDePartilhasController {
  constructor(private membrosDaListaDePartilhasService: MembrosDaListaDePartilhasService) { }

  @Post()
  add(@Body() data: AddMembrosDaListaDePartilhasDto) {
    return this.membrosDaListaDePartilhasService.add(data);
  }

  @Put()
  update(@Body() data: UpdateMembrosDaListaDePartilhasDto) {
    return this.membrosDaListaDePartilhasService.update(data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.membrosDaListaDePartilhasService.remove(id);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.membrosDaListaDePartilhasService.getOne(id);
  }

  @Post('listarMembrosDaListaDePartilhas')
  listarMembrosDaListaDePartilhas() {
    return this.membrosDaListaDePartilhasService.listarMembrosDaListaDePartilhas();
  }
}
