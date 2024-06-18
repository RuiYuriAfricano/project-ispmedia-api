/* eslint-disable prettier/prettier */
export class AddUtilizadorDto {
    username: string
    senha: string
    email: string
    telefone: string
    tipoDeUtilizador: string //normal-admin
    fotografia: string
    estado: string //ativo-pendente-inativo
    codVerificacao?: string
}