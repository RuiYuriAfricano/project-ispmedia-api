import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { MusicaService } from './musica.service';
import { AddMusicaDto } from './dto/addMusicaDto';
import { UpdateMusicaDto } from './dto/updateMusicaDto';

@Controller('musica')
export class MusicaController {
  constructor(private musicaService: MusicaService) { }

  @Post()
  add(@Body() data: AddMusicaDto) {
    return this.musicaService.add(data);
  }

  @Put()
  update(@Body() data: UpdateMusicaDto) {
    return this.musicaService.update(data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.musicaService.remove(id);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.musicaService.getOne(id);
  }

  @Get('listarMusicas')
  listarMusicas() {
    return this.musicaService.listarMusicas();
  }
}
