export class UpdateUtilizadorDto {
    codUtilizador: number;
    username?: string
    senha?: string
    email?: string
    telefone?: string
    tipoDeUtilizador?: string //editor-naoEditor-admin
    fotografia?: string
    estado?: string //ativo-pendente-inativo
    codVerificacao?: string
}