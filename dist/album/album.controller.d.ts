import { AlbumService } from './album.service';
import { AddAlbumDto } from './dto/addAlbumDto';
import { UpdateAlbumDto } from './dto/updateAlbumDto';
export declare class AlbumController {
    private albumService;
    constructor(albumService: AlbumService);
    add(data: AddAlbumDto): Promise<import(".prisma/client").album>;
    update(data: UpdateAlbumDto): Promise<import(".prisma/client").album>;
    remove(id: number): Promise<import(".prisma/client").album>;
    getOne(id: number): Promise<import(".prisma/client").album>;
    listarAlbuns(): Promise<(import(".prisma/client").album & {
        grupoMusical: import(".prisma/client").grupoMusical;
        artista: import(".prisma/client").artista;
        registadopor: import(".prisma/client").utilizador;
    })[]>;
}
