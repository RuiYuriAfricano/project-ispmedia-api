export class UpdatePlaylistDto {
    codPlayList: number;
    nomePlayList: string;
    fkUtilizador: number;
    tipoPlayList: string; // "privado" ou "publico"
}
