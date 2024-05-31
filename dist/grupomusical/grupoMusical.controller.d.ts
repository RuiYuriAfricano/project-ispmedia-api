import { GrupoMusicalService } from './grupoMusical.service';
import { AddGrupoMusicalDto } from './dto/addGrupoMusicalDto';
import { UpdateGrupoMusicalDto } from './dto/updateGrupoMusicalDto';
export declare class GrupoMusicalController {
    private grupoMusical;
    constructor(grupoMusical: GrupoMusicalService);
    add(data: AddGrupoMusicalDto): Promise<import(".prisma/client").grupoMusical>;
    update(data: UpdateGrupoMusicalDto): Promise<import(".prisma/client").grupoMusical>;
    remove(id: number): Promise<import(".prisma/client").grupoMusical>;
    getOne(id: number): Promise<import(".prisma/client").grupoMusical>;
    getOneByName(nomeGrupoMusical: string): Promise<import(".prisma/client").grupoMusical>;
    listarGruposMusicais(): Promise<(import(".prisma/client").grupoMusical & {
        registadopor: {
            username: string;
        };
    })[]>;
}
