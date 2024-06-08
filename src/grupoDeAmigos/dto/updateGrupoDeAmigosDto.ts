export class UpdateGrupoDeAmigosDto {
    codGrupoDeAmigos: number;
    nomeDoGrupo: string;
    fkCriador: number;
    tipoDeGrupo: string; // "privado" ou "publico"
}
