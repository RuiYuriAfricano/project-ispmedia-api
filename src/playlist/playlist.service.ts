import { Injectable, NotFoundException } from '@nestjs/common';
import { AddPlaylistDto } from './dto/addPlaylistDto';
import { UpdatePlaylistDto } from './dto/updatePlaylistDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { auth } from 'googleapis/build/src/apis/abusiveexperiencereport';

@Injectable()
export class PlaylistService {
  constructor(private prisma: PrismaService) { }

  async add(data: AddPlaylistDto) {
    try {
      data.dataDeCriacao = new Date().toISOString();
      const response = await this.prisma.playlist.create({
        data
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to create playlist: ${error.message}`);
    }
  }

  async update(data: UpdatePlaylistDto) {
    try {
      const response = await this.prisma.playlist.update({
        where: {
          codPlayList: data.codPlayList,
        },
        data,
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to update playlist: ${error.message}`);
    }
  }

  async remove(id: number) {
    const response = await this.prisma.playlist.delete({
      where: { codPlayList: id },
    });
    return response;
  }

  async getOne(id: number) {
    const response = await this.prisma.playlist.findUnique({
      where: { codPlayList: id },
    });

    if (!response) {
      throw new NotFoundException(`Playlist with ID ${id} not found`);
    }

    return response;
  }

  async listarPlaylists() {
    const response = await this.prisma.playlist.findMany({
      include: {
        utilizador: {
          select: {
            username: true,
          },
        },
        MusicasDaPlaylist: true,
        videosDaPlaylist: true,
      },
    });

    return response;
  }

  async pesquisarVideosEMusicasDaPlaylistPorId(idPlaylist) {
    const playlist = await this.prisma.playlist.findUnique({
      where: {
        codPlayList: idPlaylist,
      },
      include: {
        MusicasDaPlaylist: {
          select: {
            codMusicasDaPlayList: true,
            musica: {
              select: {
                codMusica: true,
                tituloMusica: true,
                grupoMusical: {
                  select: {
                    nomeGrupoMusical: true,
                  },
                },
                artista: {
                  select: {
                    nomeArtista: true,
                  },
                },
                fkArtista: true,
              },
            },
          },
        },
        videosDaPlaylist: {
          select: {
            codVideosDaPlayList: true,
            video: {
              select: {
                codVideo: true,
                tituloVideo: true,
                grupoMusical: {
                  select: {
                    nomeGrupoMusical: true,
                  },
                },
                artista: {
                  select: {
                    nomeArtista: true,
                  },
                },
                fkArtista: true,
              },
            },
          },
        },
      },
    });

    if (!playlist) {
      throw new Error(`Playlist com o ID '${idPlaylist}' não encontrada.`);
    }

    const resultados = [];

    // Adiciona músicas à lista de resultados
    if (playlist.MusicasDaPlaylist.length > 0) {
      for (const item of playlist.MusicasDaPlaylist) {
        const musica = item.musica;
        resultados.push({
          codigo: musica.codMusica,
          titulo: musica.tituloMusica,
          codigoConteudoDaPlayList: item.codMusicasDaPlayList,
          tipo: 'musica',
          autor: musica.fkArtista ? musica.artista.nomeArtista : musica.grupoMusical.nomeGrupoMusical,
        });
      }
    }

    // Adiciona vídeos à lista de resultados
    if (playlist.videosDaPlaylist.length > 0) {
      for (const item of playlist.videosDaPlaylist) {
        const video = item.video;
        resultados.push({
          codigo: video.codVideo,
          titulo: video.tituloVideo,
          codigoConteudoDaPlayList: item.codVideosDaPlayList,
          tipo: 'video',
          autor: video.fkArtista ? video.artista.nomeArtista : video.grupoMusical.nomeGrupoMusical,
        });
      }
    }

    return resultados;
  }


  async pesquisarMusicasEVideosPorTitulo(palavraChave) {
    const musicas = await this.prisma.musica.findMany({
      where: {
        OR: [
          { tituloMusica: { contains: palavraChave } },
          { letra: { contains: palavraChave } }, // Também pode pesquisar na letra da música se necessário
        ],
      },
      select: {
        codMusica: true,
        tituloMusica: true,
      },
    });

    const videos = await this.prisma.video.findMany({
      where: {
        OR: [
          { tituloVideo: { contains: palavraChave } },
          { legenda: { contains: palavraChave } }, // Também pode pesquisar na legenda do vídeo se necessário
        ],
      },
      select: {
        codVideo: true,
        tituloVideo: true,
      },
    });

    const resultados = [];

    // Adiciona músicas aos resultados
    if (musicas.length > 0) {
      for (const musica of musicas) {
        resultados.push({
          codigo: musica.codMusica,
          titulo: musica.tituloMusica,
          tipo: 'musica',
        });
      }
    }

    // Adiciona vídeos aos resultados
    if (videos.length > 0) {
      for (const video of videos) {
        resultados.push({
          codigo: video.codVideo,
          titulo: video.tituloVideo,
          tipo: 'video',
        });
      }
    }

    return resultados;
  }
}
