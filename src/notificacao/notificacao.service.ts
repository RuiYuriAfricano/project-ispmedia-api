import { Injectable, NotFoundException } from '@nestjs/common';
import { AddNotificacaoDto } from './dto/addNotificacaoDto';
import { UpdateNotificacaoDto } from './dto/updateNotificacaoDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificacaoService {
    constructor(private prisma: PrismaService) { }

    async add(data: AddNotificacaoDto) {
        try {
            const response = await this.prisma.notificacao.create({
                data: {
                    ...data,
                    dataNotificacao: new Date().toISOString(), // Use the current date as dataNotificacao
                },
            });

            return response;
        } catch (error) {
            throw new Error(`Failed to create notificacao: ${error.message}`);
        }
    }

    async update(data: UpdateNotificacaoDto) {
        try {
            const response = await this.prisma.notificacao.update({
                where: {
                    codNotificacao: data.codNotificacao,
                },
                data: {
                    ...data
                },
            });

            return response;
        } catch (error) {
            throw new Error(`Failed to update notificacao: ${error.message}`);
        }
    }

    async remove(id: number) {
        const response = await this.prisma.notificacao.delete({
            where: { codNotificacao: id },
        });

        return response;
    }

    async getOne(id: number) {
        const response = await this.prisma.notificacao.findUnique({
            where: { codNotificacao: id },
        });

        if (!response) {
            throw new NotFoundException(`Notificacao with ID ${id} not found`);
        }

        return response;
    }

    async listarNotificacoes() {
        const response = await this.prisma.notificacao.findMany({
            include: {
                utilizador: {
                    select: {
                        username: true,
                    },
                },
            },
            orderBy: {
                dataNotificacao: 'desc', // Ordena de forma decrescente pela data de notificação
            },
        });

        return response;
    }
}
