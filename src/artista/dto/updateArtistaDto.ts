// updateArtistaDto.ts
export class UpdateArtistaDto {
    codArtista: number;
    nomeArtista: string;
    generoMusical: string;
    fkGrupoMusical?: number | null;
    fkUtilizador: number;
}
