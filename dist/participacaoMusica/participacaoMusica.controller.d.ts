import { ParticipacaoMusicaService } from './participacaoMusica.service';
import { AddParticipacaoMusicaDto } from './dto/addParticipacaoMusicaDto';
import { UpdateParticipacaoMusicaDto } from './dto/updateParticipacaoMusicaDto';
export declare class ParticipacaoMusicaController {
    private readonly participacaoMusicaService;
    constructor(participacaoMusicaService: ParticipacaoMusicaService);
    add(data: AddParticipacaoMusicaDto): Promise<import(".prisma/client").participacaoMusica>;
    update(id: string, data: UpdateParticipacaoMusicaDto): Promise<import(".prisma/client").participacaoMusica>;
    remove(id: string): Promise<import(".prisma/client").participacaoMusica>;
    getOne(id: string): Promise<import(".prisma/client").participacaoMusica>;
    listarParticipacoes(): Promise<import(".prisma/client").participacaoMusica[]>;
}
