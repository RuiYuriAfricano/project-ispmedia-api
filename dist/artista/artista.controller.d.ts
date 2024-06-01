import { ArtistaService } from './artista.service';
import { AddArtistaDto } from './dto/addArtistaDto';
import { UpdateArtistaDto } from './dto/updateArtistaDto';
export declare class ArtistaController {
    private artistaService;
    constructor(artistaService: ArtistaService);
    add(data: AddArtistaDto): Promise<import(".prisma/client").artista>;
    update(data: UpdateArtistaDto): Promise<import(".prisma/client").artista>;
    remove(id: number): Promise<import(".prisma/client").artista>;
    getOne(id: number): Promise<import(".prisma/client").artista>;
    getOneByName(nomeArtista: string): Promise<import(".prisma/client").artista>;
    listarArtistas(): Promise<(import(".prisma/client").artista & {
        registadopor: {
            username: string;
        };
        grupoMusical: {
            nomeGrupoMusical: string;
        };
    })[]>;
}
