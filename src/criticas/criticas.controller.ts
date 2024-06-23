import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CriticaService } from './criticas.service';
import { AddCriticaDto } from './dto/addCriticaDto';
import { UpdateCriticaDto } from './dto/updateCriticaDto';

@Controller('critica')
export class CriticaController {
    constructor(private criticaService: CriticaService) { }

    @Post()
    add(@Body() data: AddCriticaDto) {
        return this.criticaService.add(data);
    }

    @Put()
    update(@Body() data: UpdateCriticaDto) {
        return this.criticaService.update(data);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.criticaService.remove(id);
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.criticaService.getOne(id);
    }

    @Post('listarCriticas')
    listarCriticas() {
        return this.criticaService.listarCriticas();
    }
}
