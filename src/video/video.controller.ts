import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { VideoService } from './video.service';
import { AddVideoDto } from './dto/addVideoDto';
import { UpdateVideoDto } from './dto/updateVideoDto';

@Controller('video')
export class VideoController {
  constructor(private videoService: VideoService) { }

  @Post()
  add(@Body() data: AddVideoDto) {
    return this.videoService.add(data);
  }

  @Put()
  update(@Body() data: UpdateVideoDto) {
    return this.videoService.update(data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.videoService.remove(id);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.videoService.getOne(id);
  }

  @Get('listarVideos')
  listarVideos() {
    return this.videoService.listarVideos();
  }
}
