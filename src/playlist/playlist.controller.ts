import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { AddPlaylistDto } from './dto/addPlaylistDto';
import { UpdatePlaylistDto } from './dto/updatePlaylistDto';

@Controller('playlist')
export class PlaylistController {
  constructor(private playlistService: PlaylistService) { }

  @Post()
  add(@Body() data: AddPlaylistDto) {
    return this.playlistService.add(data);
  }

  @Put()
  update(@Body() data: UpdatePlaylistDto) {
    return this.playlistService.update(data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.playlistService.remove(id);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.playlistService.getOne(id);
  }

  @Post('listarPlaylists')
  listarPlaylists() {
    return this.playlistService.listarPlaylists();
  }
}
