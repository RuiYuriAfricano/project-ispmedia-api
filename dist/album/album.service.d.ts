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
        registadopor: import(".prisma/client").utilizador;
        artista: import(".prisma/client").artista;
        grupoMusical: import(".prisma/client").grupoMusical;
    })[]>;
    pesquisaPorTitulo(titulo: string): Promise<(import(".prisma/client").album & {
        registadopor: import(".prisma/client").utilizador;
        artista: import(".prisma/client").artista;
        grupoMusical: import(".prisma/client").grupoMusical;
    })[]>;
    downloadCapa(id: number, destination: string): Promise<string>;
}
