import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { MembrosDosGruposService } from './membrosDosGrupos.service';
import { AddMembrosDosGruposDto } from './dto/addMembrosDosGruposDto';
import { UpdateMembrosDosGruposDto } from './dto/updateMembrosDosGruposDto';

@Controller('membros-dos-grupos')
export class MembrosDosGruposController {
  constructor(private membrosDosGruposService: MembrosDosGruposService) { }

  @Post()
  add(@Body() data: AddMembrosDosGruposDto) {
    return this.membrosDosGruposService.add(data);
  }

  @Put()
  update(@Body() data: UpdateMembrosDosGruposDto) {
    return this.membrosDosGruposService.update(data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.membrosDosGruposService.remove(id);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.membrosDosGruposService.getOne(id);
  }

  @Post('listarMembrosDosGrupos')
  listarMembrosDosGrupos() {
    return this.membrosDosGruposService.listarMembrosDosGrupos();
  }
}
