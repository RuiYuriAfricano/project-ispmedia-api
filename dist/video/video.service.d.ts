import { AddVideoDto } from './dto/addVideoDto';
import { UpdateVideoDto } from './dto/updateVideoDto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class VideoService {
    private prisma;
    constructor(prisma: PrismaService);
    add(data: AddVideoDto): Promise<import(".prisma/client").video>;
    update(data: UpdateVideoDto): Promise<import(".prisma/client").video>;
    remove(id: number): Promise<import(".prisma/client").video>;
    getOne(id: number): Promise<import(".prisma/client").video>;
    listarVideos(): Promise<(import(".prisma/client").video & {
        grupoMusical: import(".prisma/client").grupoMusical;
        artista: import(".prisma/client").artista;
        registadopor: import(".prisma/client").utilizador;
    })[]>;
    downloadVideo(id: number, range?: string): Promise<{
        headers: {
            'Content-Length': any;
            'Content-Type': string;
        };
        filePath: string;
        start: number;
        end: number;
    }>;
}
