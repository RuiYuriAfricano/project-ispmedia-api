// addArtistaDto.ts
export class AddArtistaDto {
    nomeArtista: string;
    generoMusical: string;
    fkGrupoMusical?: number | null;
    fkUtilizador: number;
}
