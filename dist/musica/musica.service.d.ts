import { AddMusicaDto } from './dto/addMusicaDto';
import { UpdateMusicaDto } from './dto/updateMusicaDto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class MusicaService {
    private prisma;
    constructor(prisma: PrismaService);
    add(data: AddMusicaDto): Promise<import(".prisma/client").musica>;
    update(data: UpdateMusicaDto): Promise<import(".prisma/client").musica>;
    remove(id: number): Promise<import(".prisma/client").musica>;
    getOne(id: number): Promise<import(".prisma/client").musica>;
    listarMusicas(): Promise<(import(".prisma/client").musica & {
        album: import(".prisma/client").album;
        registadopor: import(".prisma/client").utilizador;
        artista: import(".prisma/client").artista;
        grupoMusical: import(".prisma/client").grupoMusical;
    })[]>;
}
