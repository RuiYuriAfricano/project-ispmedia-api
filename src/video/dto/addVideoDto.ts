// addVideoDto.ts
export class AddVideoDto {
    tituloVideo: string;
    ficheiroDoVideo: string;
    legenda: string;
    produtor: string;
    generoDoVideo: string;
    fkGrupoMusical?: number;
    fkArtista?: number;
    fkGrupoDeAmigos?: number;
    dataLancamento: string;
    fkUtilizador: number;
    dataDeRegisto: string;
}
