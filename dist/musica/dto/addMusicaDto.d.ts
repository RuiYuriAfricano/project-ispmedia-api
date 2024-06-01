export declare class AddMusicaDto {
    tituloMusica: string;
    ficheiroMusical: string;
    letra: string;
    generoMusical: string;
    compositor: string;
    capaMusica: string;
    fkAlbum?: number;
    fkGrupoMusical?: number;
    fkArtista?: number;
    dataLancamento: string;
    dataDeRegisto: string;
    fkUtilizador: number;
}
