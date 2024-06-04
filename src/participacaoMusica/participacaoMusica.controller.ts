// participacaoMusica.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ParticipacaoMusicaService } from './participacaoMusica.service';
import { AddParticipacaoMusicaDto } from './dto/addParticipacaoMusicaDto';
import { UpdateParticipacaoMusicaDto } from './dto/updateParticipacaoMusicaDto';

@Controller('participacaoMusica')
export class ParticipacaoMusicaController {
  constructor(private readonly participacaoMusicaService: ParticipacaoMusicaService) { }

  @Post()
  add(@Body() data: AddParticipacaoMusicaDto) {
    return this.participacaoMusicaService.add({
      fkArtista: Number(data.fkArtista),
      fkMusica: Number(data.fkMusica)
    });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateParticipacaoMusicaDto) {
    return this.participacaoMusicaService.update({ ...data, codParticipacaoMusica: +id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participacaoMusicaService.remove(+id);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.participacaoMusicaService.getOne(+id);
  }

  @Post("listarParticipacaoMusica")
  listarParticipacoes() {
    return this.participacaoMusicaService.listarParticipacoes();
  }
}
