// addAlbumDto.ts
export class AddAlbumDto {
    tituloAlbum: string;
    descricao: string;
    editora: string;
    capaAlbum: string;
    dataLancamento: string;
    dataDeRegistro: string;
    fkArtista?: number;
    fkGrupoMusical?: number;
    fkUtilizador: number;
    visibilidade?: string;
}
