export class UpdateMembrosDosGruposDto {
    codMembro: number;
    fkGrupoDeAmigos: number;
    fkUtilizador: number;
    isOwner: number; //1-sim, 0-não
    estado: number;   //1-ativo 0-inactivo (quando for por meio de um pedido)
}
