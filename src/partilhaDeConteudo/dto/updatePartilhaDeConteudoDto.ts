export class UpdatePartilhaDeConteudoDto {
    codPartilha: number;
    tipoDeConteudo: string //video, musica, album
    fkVideo?: number | null;
    fkMusica?: number | null;
    fkAlbum?: number | null;
    fkGrupoDeAmigos: number;
    fkUtilizador: number;
}