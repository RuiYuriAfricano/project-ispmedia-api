// participacaoVideo.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ParticipacaoVideoService } from './participacaoVideo.service';
import { AddParticipacaoVideoDto } from './dto/addParticipacaoVideoDto';
import { UpdateParticipacaoVideoDto } from './dto/updateParticipacaoVideoDto';

@Controller('participacaoVideo')
export class ParticipacaoVideoController {
  constructor(private readonly participacaoVideoService: ParticipacaoVideoService) { }

  @Post()
  add(@Body() data: AddParticipacaoVideoDto) {
    return this.participacaoVideoService.add({
      fkArtista: Number(data.fkArtista),
      fkVideo: Number(data.fkVideo)
    });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateParticipacaoVideoDto) {
    return this.participacaoVideoService.update({ ...data, codParticipacaoVideo: +id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participacaoVideoService.remove(+id);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.participacaoVideoService.getOne(+id);
  }

  @Post("listarParticipacaoVideo")
  listarParticipacoes() {
    return this.participacaoVideoService.listarParticipacoes();
  }
}
