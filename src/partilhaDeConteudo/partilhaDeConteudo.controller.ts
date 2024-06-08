import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { PartilhaDeConteudoService } from './partilhaDeConteudo.service';
import { AddPartilhaDeConteudoDto } from './dto/addPartilhaDeConteudoDto';
import { UpdatePartilhaDeConteudoDto } from './dto/updatePartilhaDeConteudoDto';

@Controller('partilhaDeConteudo')
export class PartilhaDeConteudoController {
  constructor(private partilhaDeConteudoService: PartilhaDeConteudoService) { }

  @Post()
  add(@Body() data: AddPartilhaDeConteudoDto) {
    return this.partilhaDeConteudoService.add(data);
  }

  @Put()
  update(@Body() data: UpdatePartilhaDeConteudoDto) {
    return this.partilhaDeConteudoService.update(data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.partilhaDeConteudoService.remove(id);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.partilhaDeConteudoService.getOne(id);
  }

  @Post('listarPartilhaDeConteudo')
  listarPartilhaDeConteudo() {
    return this.partilhaDeConteudoService.listarPartilhaDeConteudo();
  }
}
