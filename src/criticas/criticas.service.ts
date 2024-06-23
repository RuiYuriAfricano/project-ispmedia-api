import { Injectable, NotFoundException } from '@nestjs/common';
import { AddCriticaDto } from './dto/addCriticaDto';
import { UpdateCriticaDto } from './dto/updateCriticaDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CriticaService {
    constructor(private prisma: PrismaService) { }

    async add(data: AddCriticaDto) {
        try {
            const response = await this.prisma.critica.create({
                data: {
                    ...data,
                    dataDeRegisto: new Date().toISOString(), // Use the current date as dataDeRegisto
                },
            });

            return response;
        } catch (error) {
            throw new Error(`Failed to create critica: ${error.message}`);
        }
    }

    async update(data: UpdateCriticaDto) {
        try {
            const response = await this.prisma.critica.update({
                where: {
                    codCritica: data.codCritica,
                },
                data: {
                    ...data
                },
            });

            return response;
        } catch (error) {
            throw new Error(`Failed to update critica: ${error.message}`);
        }
    }

    async remove(id: number) {
        const response = await this.prisma.critica.delete({
            where: { codCritica: id },
        });

        return response;
    }

    async getOne(id: number) {
        const response = await this.prisma.critica.findUnique({
            where: { codCritica: id },
        });

        if (!response) {
            throw new NotFoundException(`Critica with ID ${id} not found`);
        }

        return response;
    }

    async listarCriticas() {
        const response = await this.prisma.critica.findMany({
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
