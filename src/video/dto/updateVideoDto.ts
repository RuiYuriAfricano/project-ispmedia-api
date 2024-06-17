// updateVideoDto.ts
export class UpdateVideoDto {
    codVideo: number;
    tituloVideo?: string;
    ficheiroDoVideo?: string;
    legenda?: string;
    produtor?: string;
    generoDoVideo?: string;
    fkGrupoMusical?: number;
    fkArtista?: number;
    dataLancamento?: Date;
    fkUtilizador?: number;
    visibilidade?: string;
}
