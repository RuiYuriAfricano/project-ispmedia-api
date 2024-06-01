import { AddAlbumDto } from './dto/addAlbumDto';
import { UpdateAlbumDto } from './dto/updateAlbumDto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AlbumService {
    private prisma;
    private readonly CAPA_FOLDER;
    constructor(prisma: PrismaService);
    add(data: AddAlbumDto): Promise<import(".prisma/client").album>;
    update(data: UpdateAlbumDto): Promise<import(".prisma/client").album>;
    remove(id: number): Promise<import(".prisma/client").album>;
    getOne(id: number): Promise<import(".prisma/client").album>;
    listarAlbuns(): Promise<(import(".prisma/client").album & {
        grupoMusical: import(".prisma/client").grupoMusical;
        artista: import(".prisma/client").artista;
        registadopor: import(".prisma/client").utilizador;
    })[]>;
    pesquisaPorTitulo(titulo: string): Promise<(import(".prisma/client").album & {
        grupoMusical: import(".prisma/client").grupoMusical;
        artista: import(".prisma/client").artista;
        registadopor: import(".prisma/client").utilizador;
    })[]>;
    downloadCapa(id: number): Promise<string>;
}
