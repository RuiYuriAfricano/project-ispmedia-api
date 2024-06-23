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
import { VideosDaPlaylistModule } from './videosDaPlaylist/videosDaPlaylist.module';
import { GrupoDeAmigosModule } from './grupoDeAmigos/grupoDeAmigos.module';
import { MembrosDosGruposModule } from './membrosDosGrupos/membrosDosGrupos.module';
import { ListaDePartilhaModule } from './listaDePartilha/listaDePartilha.module';
import { MembrosDaListaDePartilhasModule } from './membrosDaListaDePartilhas/membrosDaListaDePartilhas.module';
import { PrismaService } from './prisma/prisma.service';
import { ConteudoDosGruposModule } from './conteudoDosGrupos/conteudoDosGrupos.module';
import { LikeModule } from './like/like.module';
import { NotificacaoModule } from './notificacao/notificacao.module';
import { CriticaModule } from './criticas/criticas.module';



@Module({
  imports: [UtilizadorModule, GrupoMusicalModule, ArtistaModule, AlbumModule, MusicaModule,
    VideoModule, ParticipacaoVideoModule, ParticipacaoMusicaModule, PlaylistModule, MusicasDaPlaylistModule,
    VideosDaPlaylistModule, GrupoDeAmigosModule, MembrosDosGruposModule,
    ListaDePartilhaModule, MembrosDaListaDePartilhasModule, ConteudoDosGruposModule,
    LikeModule, NotificacaoModule, CriticaModule],
  providers: [PrismaService],
})
export class AppModule { }
