export class UpdateNotificacaoDto {
    codNotificacao: number;
    textoNotificacao: string;
    fkUtilizador: number;
    utilizadorOrigem?: string;
}
