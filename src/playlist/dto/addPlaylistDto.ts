export class AddPlaylistDto {
    nomePlayList: string;
    fkUtilizador: number;
    tipoPlayList: string; // "privado" ou "publico"
    dataDeCriacao: string;
}
