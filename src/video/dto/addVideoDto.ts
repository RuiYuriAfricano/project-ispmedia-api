// addVideoDto.ts
export class AddVideoDto {
    tituloVideo: string;
    ficheiroDoVideo: string;
    legenda: string;
    produtor: string;
    generoDoVideo: string;
    fkGrupoMusical: number;
    fkArtista: number;
    dataLancamento: Date;
    dataDeRegisto: Date;
    fkUtilizador: number;
}
