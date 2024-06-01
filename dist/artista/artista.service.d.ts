import { AddArtistaDto } from './dto/addArtistaDto';
import { UpdateArtistaDto } from './dto/updateArtistaDto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ArtistaService {
    private prisma;
    constructor(prisma: PrismaService);
    add(data: AddArtistaDto): Promise<import(".prisma/client").artista>;
    update(data: UpdateArtistaDto): Promise<import(".prisma/client").artista>;
    remove(id: number): Promise<import(".prisma/client").artista>;
    getOne(id: number): Promise<import(".prisma/client").artista>;
    getOneByName(nomeArtista: string): Promise<import(".prisma/client").artista>;
    listarArtistas(): Promise<(import(".prisma/client").artista & {
        grupoMusical: {
            nomeGrupoMusical: string;
        };
        registadopor: {
            username: string;
        };
    })[]>;
}
