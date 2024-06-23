import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { LikeService } from './like.service';
import { AddLikeDto } from './dto/addLikeDto';
import { UpdateLikeDto } from './dto/updateLikeDto';

@Controller('like')
export class LikeController {
    constructor(private likeService: LikeService) { }

    @Post()
    add(@Body() data: AddLikeDto) {
        return this.likeService.add(data);
    }

    @Put()
    update(@Body() data: UpdateLikeDto) {
        return this.likeService.update(data);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.likeService.remove(id);
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.likeService.getOne(id);
    }

    @Post('listarLikes')
    listarLikes() {
        return this.likeService.listarLikes();
    }
}
