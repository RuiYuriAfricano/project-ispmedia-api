import { Injectable, NotFoundException } from '@nestjs/common';
import { AddLikeDto } from './dto/addLikeDto';
import { UpdateLikeDto } from './dto/updateLikeDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikeService {
    constructor(private prisma: PrismaService) { }

    async add(data: AddLikeDto) {
        try {
            const response = await this.prisma.like.create({
                data: {
                    ...data,
                    dataDeRegisto: new Date().toISOString(), // Use the current date as dataDeRegisto
                },
            });

            return response;
        } catch (error) {
            throw new Error(`Failed to create like: ${error.message}`);
        }
    }

    async update(data: UpdateLikeDto) {
        try {
            const response = await this.prisma.like.update({
                where: {
                    codLike: data.codLike,
                },
                data: {
                    ...data
                },
            });

            return response;
        } catch (error) {
            throw new Error(`Failed to update like: ${error.message}`);
        }
    }

    async remove(id: number) {
        const response = await this.prisma.like.delete({
            where: { codLike: id },
        });

        return response;
    }

    async getOne(id: number) {
        const response = await this.prisma.like.findUnique({
            where: { codLike: id },
        });

        if (!response) {
            throw new NotFoundException(`Like with ID ${id} not found`);
        }

        return response;
    }

    async listarLikes() {
        const response = await this.prisma.like.findMany({
            include: {
                utilizador: {
                    select: {
                        username: true,
                    },
                },
                album: {
                    select: {
                        nomeAlbum: true,
                    },
                },
                musica: {
                    select: {
                        nomeMusica: true,
                    },
                },
                video: {
                    select: {
                        nomeVideo: true,
                    },
                },
            },
        });

        return response;
    }
}
