import { MusicaService } from './musica.service';
import { AddMusicaDto } from './dto/addMusicaDto';
import { UpdateMusicaDto } from './dto/updateMusicaDto';
import { Response } from 'express';
export declare class MusicaController {
    private musicaService;
    constructor(musicaService: MusicaService);
    add(data: AddMusicaDto): Promise<import(".prisma/client").musica>;
    update(data: UpdateMusicaDto): Promise<import(".prisma/client").musica>;
    remove(id: number): Promise<import(".prisma/client").musica>;
    getOne(id: number): Promise<import(".prisma/client").musica>;
    listarMusicas(): Promise<(import(".prisma/client").musica & {
        album: import(".prisma/client").album;
        grupoMusical: import(".prisma/client").grupoMusical;
        artista: import(".prisma/client").artista;
        registadopor: import(".prisma/client").utilizador;
    })[]>;
    downloadCapa(id: number, res: Response): Promise<void>;
    downloadMusica(id: number, res: Response): Promise<void>;
}
