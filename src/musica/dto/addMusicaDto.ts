// addMusicaDto.ts
export class AddMusicaDto {
    tituloMusica: string;
    ficheiroMusical: string;
    letra: string;
    generoMusical: string;
    compositor: string;
    capaMusica: string;
    fkAlbum?: number;
    fkGrupoMusical?: number;
    fkArtista?: number;
    fkGrupoDeAmigos?: number;
    dataLancamento: string;
    dataDeRegisto: string;
    fkUtilizador: number;
}
