import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { MusicasDaPlaylistService } from './musicasDaPlaylist.service';
import { AddMusicasDaPlaylistDto } from './dto/addMusicasDaPlaylistDto';
import { UpdateMusicasDaPlaylistDto } from './dto/updateMusicasDaPlaylistDto';

@Controller('musicas-da-playlist')
export class MusicasDaPlaylistController {
  constructor(private musicasDaPlaylistService: MusicasDaPlaylistService) { }

  @Post()
  add(@Body() data: AddMusicasDaPlaylistDto) {
    return this.musicasDaPlaylistService.add(data);
  }

  @Put()
  update(@Body() data: UpdateMusicasDaPlaylistDto) {
    return this.musicasDaPlaylistService.update(data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.musicasDaPlaylistService.remove(id);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.musicasDaPlaylistService.getOne(id);
  }

  @Post('listarMusicasDaPlaylist')
  listarMusicasDaPlaylist() {
    return this.musicasDaPlaylistService.listarMusicasDaPlaylist();
  }
}
