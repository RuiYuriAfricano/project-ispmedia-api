import { UtilizadorService } from './utilizador.service';
import { AddUtilizadorDto } from './dto/addUtilizadorDto';
import { UpdateUtilizadorDto } from './dto/updateUtilizadorDto';
export declare class UtilizadorController {
    private utilizadorService;
    constructor(utilizadorService: UtilizadorService);
    login(username: string, senha: string): Promise<import(".prisma/client").utilizador>;
    add(data: AddUtilizadorDto): Promise<import(".prisma/client").utilizador>;
    update(data: UpdateUtilizadorDto): Promise<import(".prisma/client").utilizador>;
    remove(id: number): Promise<import(".prisma/client").utilizador>;
    getOne(id: number): Promise<import(".prisma/client").utilizador>;
    getOneByName(username: string): Promise<import(".prisma/client").utilizador>;
}
