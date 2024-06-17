import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ConteudoDosGruposService } from './conteudoDosGrupos.service';
import { AddConteudoDosGruposDto } from './dto/addConteudoDosGruposDto';
import { UpdateConteudoDosGruposDto } from './dto/updateConteudoDosGruposDto';

@Controller('conteudo-dos-grupos')
export class ConteudoDosGruposController {
  constructor(private conteudoDosGruposService: ConteudoDosGruposService) { }

  @Post()
  add(@Body() data: AddConteudoDosGruposDto) {
    return this.conteudoDosGruposService.add(data);
  }

  @Put()
  update(@Body() data: UpdateConteudoDosGruposDto) {
    return this.conteudoDosGruposService.update(data);
  }

  @Put("atualizar-conteudo-do-grupo")
  updateFk(@Body() data: UpdateConteudoDosGruposDto) {
    return this.conteudoDosGruposService.updatePorFk(data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.conteudoDosGruposService.remove(id);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.conteudoDosGruposService.getOne(id);
  }

  @Post('listarConteudoDosGrupos')
  listarConteudoDosGrupos() {
    return this.conteudoDosGruposService.listarConteudoDosGrupos();
  }
}
