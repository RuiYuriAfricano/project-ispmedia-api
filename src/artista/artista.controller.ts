import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ArtistaService } from './artista.service';
import { AddArtistaDto } from './dto/addArtistaDto';
import { UpdateArtistaDto } from './dto/updateArtistaDto';

@Controller('artista')
export class ArtistaController {
  constructor(private artistaService: ArtistaService) { }

  @Post()
  add(@Body() data: AddArtistaDto) {
    return this.artistaService.add(data);
  }

  @Put()
  update(@Body() data: UpdateArtistaDto) {
    return this.artistaService.update(data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.artistaService.remove(id);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.artistaService.getOne(id);
  }

  @Post('pesquisapornome')
  getOneByName(@Body('nomeArtista') nomeArtista: string) {
    return this.artistaService.getOneByName(nomeArtista);
  }

  @Get('listarArtistas')
  listarArtistas() {
    return this.artistaService.listarArtistas();
  }
}
