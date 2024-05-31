import { PrismaService } from 'src/prisma/prisma.service';
import { AddParticipacaoMusicaDto } from './dto/addParticipacaoMusicaDto';
import { UpdateParticipacaoMusicaDto } from './dto/updateParticipacaoMusicaDto';
export declare class ParticipacaoMusicaService {
    private prisma;
    constructor(prisma: PrismaService);
    add(data: AddParticipacaoMusicaDto): Promise<import(".prisma/client").participacaoMusica>;
    update(data: UpdateParticipacaoMusicaDto): Promise<import(".prisma/client").participacaoMusica>;
    remove(id: number): Promise<import(".prisma/client").participacaoMusica>;
    getOne(id: number): Promise<import(".prisma/client").participacaoMusica>;
    listarParticipacoes(): Promise<import(".prisma/client").participacaoMusica[]>;
}
