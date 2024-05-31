// addAlbumDto.ts
export class AddAlbumDto {
    tituloAlbum: string;
    descricao: string;
    editora: string;
    capaAlbum: string;
    dataLancamento: Date;
    fkArtista: number;
    fkGrupoMusical: number;
    fkUtilizador: number;
}
