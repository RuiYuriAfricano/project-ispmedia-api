// updateAlbumDto.ts
export class UpdateAlbumDto {
    codAlbum: number;
    tituloAlbum?: string;
    descricao?: string;
    editora?: string;
    capaAlbum?: string;
    dataLancamento?: Date;
    fkArtista?: number;
    fkGrupoMusical?: number;
    fkUtilizador?: number;
    visibilidade?: number;
}
