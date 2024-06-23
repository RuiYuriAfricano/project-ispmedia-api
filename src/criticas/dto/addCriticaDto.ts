export class AddCriticaDto {
    fkAlbum?: number | null;
    fkMusica?: number | null;
    fkVideo?: number | null;
    fkUtilizador: number;
    pontuacao: number;
    comentario: string;
}
