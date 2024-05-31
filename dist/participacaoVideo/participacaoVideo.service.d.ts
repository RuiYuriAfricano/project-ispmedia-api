import { PrismaService } from 'src/prisma/prisma.service';
import { AddParticipacaoVideoDto } from './dto/addParticipacaoVideoDto';
import { UpdateParticipacaoVideoDto } from './dto/updateParticipacaoVideoDto';
export declare class ParticipacaoVideoService {
    private prisma;
    constructor(prisma: PrismaService);
    add(data: AddParticipacaoVideoDto): Promise<import(".prisma/client").participacaoVideo>;
    update(data: UpdateParticipacaoVideoDto): Promise<import(".prisma/client").participacaoVideo>;
    remove(id: number): Promise<import(".prisma/client").participacaoVideo>;
    getOne(id: number): Promise<import(".prisma/client").participacaoVideo>;
    listarParticipacoes(): Promise<import(".prisma/client").participacaoVideo[]>;
}
