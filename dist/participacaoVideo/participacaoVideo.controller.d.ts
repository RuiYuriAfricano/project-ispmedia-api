import { ParticipacaoVideoService } from './participacaoVideo.service';
import { AddParticipacaoVideoDto } from './dto/addParticipacaoVideoDto';
import { UpdateParticipacaoVideoDto } from './dto/updateParticipacaoVideoDto';
export declare class ParticipacaoVideoController {
    private readonly participacaoVideoService;
    constructor(participacaoVideoService: ParticipacaoVideoService);
    add(data: AddParticipacaoVideoDto): Promise<import(".prisma/client").participacaoVideo>;
    update(id: string, data: UpdateParticipacaoVideoDto): Promise<import(".prisma/client").participacaoVideo>;
    remove(id: string): Promise<import(".prisma/client").participacaoVideo>;
    getOne(id: string): Promise<import(".prisma/client").participacaoVideo>;
    listarParticipacoes(): Promise<import(".prisma/client").participacaoVideo[]>;
}
