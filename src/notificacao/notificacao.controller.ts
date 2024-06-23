import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { NotificacaoService } from './notificacao.service';
import { AddNotificacaoDto } from './dto/addNotificacaoDto';
import { UpdateNotificacaoDto } from './dto/updateNotificacaoDto';

@Controller('notificacao')
export class NotificacaoController {
    constructor(private notificacaoService: NotificacaoService) { }

    @Post()
    add(@Body() data: AddNotificacaoDto) {
        return this.notificacaoService.add(data);
    }

    @Put()
    update(@Body() data: UpdateNotificacaoDto) {
        return this.notificacaoService.update(data);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.notificacaoService.remove(id);
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.notificacaoService.getOne(id);
    }

    @Post('listarNotificacoes')
    listarNotificacoes() {
        return this.notificacaoService.listarNotificacoes();
    }
}
