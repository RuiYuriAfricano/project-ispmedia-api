import { Injectable, NotFoundException } from '@nestjs/common';
import { AddGrupoDeAmigosDto } from './dto/addGrupoDeAmigosDto';
import { UpdateGrupoDeAmigosDto } from './dto/updateGrupoDeAmigosDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GrupoDeAmigosService {
  constructor(private prisma: PrismaService) { }

  async add(data: AddGrupoDeAmigosDto) {
    try {
      data.dataDeCriacao = new Date().toISOString();
      const response = await this.prisma.grupoDeAmigos.create({
        data,
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to create group of friends: ${error.message}`);
    }
  }

  async update(data: UpdateGrupoDeAmigosDto) {
    try {
      const response = await this.prisma.grupoDeAmigos.update({
        where: {
          codGrupoDeAmigos: data.codGrupoDeAmigos,
        },
        data,
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to update group of friends: ${error.message}`);
    }
  }

  async remove(id: number) {
    const response = await this.prisma.grupoDeAmigos.delete({
      where: { codGrupoDeAmigos: id },
    });
    return response;
  }

  async getOne(id: number) {
    const response = await this.prisma.grupoDeAmigos.findUnique({
      where: { codGrupoDeAmigos: id },
    });

    if (!response) {
      throw new NotFoundException(`Group of friends with ID ${id} not found`);
    }

    return response;
  }

  async listarGruposDeAmigos() {
    const response = await this.prisma.grupoDeAmigos.findMany({
      include: {
        utilizador: {
          select: {
            username: true,
          },
        },
        membrosDosGrupos: true,
        membrosDaListaDePartilhas: true,
      },
    });

    return response;
  }

  async pesquisarVideosMusicasEAlbunsDoGrupoPorId(idGrupo) {
    const grupo = await this.prisma.grupoDeAmigos.findUnique({
      where: {
        codGrupoDeAmigos: idGrupo,
      },
      include: {
        conteudosDosGrupos: {
          select: {
            codConteudo: true,
            fkAlbum: true,
            fkMusica: true,
            fkVideo: true,
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
            album: {
              select: {
                codAlbum: true,
                tituloAlbum: true,
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
          },
        },
      },
    });

    if (!grupo) {
      throw new Error(`Group com o ID '${idGrupo}' não encontrado.`);
    }

    const resultados = [];

    // Adiciona músicas à lista de resultados
    if (grupo.conteudosDosGrupos.length > 0) {
      for (const item of grupo.conteudosDosGrupos) {

        if (item.fkMusica) {
          const musica = item.musica;
          resultados.push({
            codigo: musica.codMusica,
            titulo: musica.tituloMusica,
            codigoConteudo: item.codConteudo,
            tipo: 'musica',
            autor: musica.fkArtista ? musica.artista.nomeArtista : musica.grupoMusical.nomeGrupoMusical,
          });
        }
        if (item.fkVideo) {
          const video = item.video;
          resultados.push({
            codigo: video.codVideo,
            titulo: video.tituloVideo,
            codigoConteudo: item.codConteudo,
            tipo: 'video',
            autor: video.fkArtista ? video.artista.nomeArtista : video.grupoMusical.nomeGrupoMusical,
          });
        }
        if (item.fkAlbum) {
          const album = item.album;
          resultados.push({
            codigo: album.codAlbum,
            titulo: album.tituloAlbum,
            codigoConteudo: item.codConteudo,
            tipo: 'album',
            musicasDoAlbum: item.album.musica,
            autor: album.fkArtista ? album.artista.nomeArtista : album.grupoMusical.nomeGrupoMusical,
          });
        }


      }
    }


    return resultados;
  }

  async pesquisarMusicasVideosEAlbumPorTitulo(palavraChave) {
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

    const albuns = await this.prisma.album.findMany({
      where: {
        OR: [
          { tituloAlbum: { contains: palavraChave } },
          { descricao: { contains: palavraChave } }, // Também pode pesquisar na descriçao do album se necessário
        ],
      },
      select: {
        codAlbum: true,
        tituloAlbum: true,
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

    // Adiciona albuns aos resultados
    if (albuns.length > 0) {
      for (const album of albuns) {
        resultados.push({
          codigo: album.codAlbum,
          titulo: album.tituloAlbum,
          tipo: 'album',
        });
      }
    }

    return resultados;
  }
}
