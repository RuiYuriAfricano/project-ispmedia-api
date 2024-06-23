export class UpdateLikeDto {
    codLike: number;
    fkAlbum?: number | null;
    fkMusica?: number | null;
    fkVideo?: number | null;
    fkUtilizador: number;
}
