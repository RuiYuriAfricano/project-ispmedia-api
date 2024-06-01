import { VideoService } from './video.service';
import { AddVideoDto } from './dto/addVideoDto';
import { UpdateVideoDto } from './dto/updateVideoDto';
export declare class VideoController {
    private videoService;
    constructor(videoService: VideoService);
    add(data: AddVideoDto): Promise<import(".prisma/client").video>;
    update(data: UpdateVideoDto): Promise<import(".prisma/client").video>;
    remove(id: number): Promise<import(".prisma/client").video>;
    getOne(id: number): Promise<import(".prisma/client").video>;
    listarVideos(): Promise<(import(".prisma/client").video & {
        registadopor: import(".prisma/client").utilizador;
        artista: import(".prisma/client").artista;
        grupoMusical: import(".prisma/client").grupoMusical;
    })[]>;
}
