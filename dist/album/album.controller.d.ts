/// <reference types="multer" />
import { AlbumService } from './album.service';
import { AddAlbumDto } from './dto/addAlbumDto';
import { UpdateAlbumDto } from './dto/updateAlbumDto';
import { Response } from 'express';
export declare class AlbumController {
    private albumService;
    constructor(albumService: AlbumService);
    add(data: AddAlbumDto, file: Express.Multer.File): Promise<import(".prisma/client").album>;
    update(data: UpdateAlbumDto, file: Express.Multer.File): Promise<import(".prisma/client").album>;
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
    downloadCapa(id: number, res: Response): Promise<void>;
}
