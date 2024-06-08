/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UtilizadorModule } from './utilizador/utilizador.module';
import { GrupoMusicalModule } from './grupomusical/grupoMusical.module';
import { ArtistaModule } from './artista/artista.module';
import { AlbumModule } from './album/album.module';
import { MusicaModule } from './musica/musica.module';
import { VideoModule } from './video/video.module';
import { ParticipacaoVideoModule } from './participacaoVideo/participacaoVideo.module';
import { ParticipacaoMusicaModule } from './participacaoMusica/participacaoMusica.module';
import { PlaylistModule } from './playlist/playlist.module';
import { MusicasDaPlaylistModule } from './musicasDaPlaylist/musicasDaPlaylist.module';
import { PartilhaDeConteudoModule } from './partilhaDeConteudo/partilhaDeConteudo.module';
import { VideosDaPlaylistModule } from './videosDaPlaylist/videosDaPlaylist.module';
import { PrismaService } from './prisma/prisma.service';



@Module({
  imports: [UtilizadorModule, GrupoMusicalModule, ArtistaModule, AlbumModule, MusicaModule,
    VideoModule, ParticipacaoVideoModule, ParticipacaoMusicaModule, PlaylistModule, MusicasDaPlaylistModule,
    PartilhaDeConteudoModule, VideosDaPlaylistModule],
  providers: [PrismaService],
})
export class AppModule { }
