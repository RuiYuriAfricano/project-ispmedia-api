import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { VideosDaPlaylistService } from './videosDaPlaylist.service';
import { AddVideosDaPlaylistDto } from './dto/addVideosDaPlaylistDto';
import { UpdateVideosDaPlaylistDto } from './dto/updateVideosDaPlaylistDto';

@Controller('videos-da-playlist')
export class VideosDaPlaylistController {
  constructor(private videosDaPlaylistService: VideosDaPlaylistService) { }

  @Post()
  add(@Body() data: AddVideosDaPlaylistDto) {
    return this.videosDaPlaylistService.add(data);
  }

  @Put()
  update(@Body() data: UpdateVideosDaPlaylistDto) {
    return this.videosDaPlaylistService.update(data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.videosDaPlaylistService.remove(id);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.videosDaPlaylistService.getOne(id);
  }

  @Post('listarVideosDaPlaylist')
  listarVideosDaPlaylist() {
    return this.videosDaPlaylistService.listarVideosDaPlaylist();
  }
}
