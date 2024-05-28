import { AddUtilizadorDto } from './dto/addUtilizadorDto';
import { UpdateUtilizadorDto } from './dto/updateUtilizadorDto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class UtilizadorService {
    private prisma;
    constructor(prisma: PrismaService);
    login(username: string, senha: string): Promise<import(".prisma/client").utilizador>;
    add(data: AddUtilizadorDto): Promise<import(".prisma/client").utilizador>;
    update(data: UpdateUtilizadorDto): Promise<import(".prisma/client").utilizador>;
    remove(id: number): Promise<import(".prisma/client").utilizador>;
    getOne(id: number): Promise<import(".prisma/client").utilizador>;
    getOneByName(username: string): Promise<import(".prisma/client").utilizador>;
}
