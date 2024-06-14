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

  // Método para obter músicas e vídeos de uma playlist por ID usando POST
  @Post(':id/videos-e-musicas')
  async getVideosEMusicasDaPlaylist(@Param('id', ParseIntPipe) id: number) {
    try {
      const resultados = await this.playlistService.pesquisarVideosEMusicasDaPlaylistPorId(id);
      return { success: true, data: resultados };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Método para pesquisar músicas e vídeos por título
  @Post('pesquisar')
  async pesquisarMusicasEVideosPorTitulo(@Body() body: { palavraChave: string }) {
    try {
      const resultados = await this.playlistService.pesquisarMusicasEVideosPorTitulo(body.palavraChave);
      return { success: true, data: resultados };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

}
