import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ListaDePartilhaService } from './listaDePartilha.service';
import { AddListaDePartilhaDto } from './dto/addListaDePartilhaDto';
import { UpdateListaDePartilhaDto } from './dto/updateListaDePartilhaDto';

@Controller('lista-de-partilha')
export class ListaDePartilhaController {
  constructor(private listaDePartilhaService: ListaDePartilhaService) { }

  @Post()
  add(@Body() data: AddListaDePartilhaDto) {
    return this.listaDePartilhaService.add(data);
  }

  @Put()
  update(@Body() data: UpdateListaDePartilhaDto) {
    return this.listaDePartilhaService.update(data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.listaDePartilhaService.remove(id);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.listaDePartilhaService.getOne(id);
  }

  @Post('listarListasDePartilha')
  listarListasDePartilha() {
    return this.listaDePartilhaService.listarListasDePartilha();
  }
}
