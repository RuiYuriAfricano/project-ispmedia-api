"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const fs = require("fs-extra");
const path = require("path");
let MusicaService = class MusicaService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async add(data) {
        const currentDate = new Date().toISOString();
        let dataLancamento;
        let dataDeRegistro;
        try {
            dataLancamento = new Date(data.dataLancamento).toISOString();
            dataDeRegistro = currentDate;
        }
        catch (error) {
            throw new Error('Invalid date value');
        }
        try {
            const response = await this.prisma.musica.create({
                data: {
                    tituloMusica: data.tituloMusica,
                    ficheiroMusical: data.ficheiroMusical,
                    letra: data.letra,
                    compositor: data.compositor,
                    generoMusical: data.generoMusical,
                    capaMusica: data.capaMusica,
                    fkGrupoMusical: data.fkGrupoMusical,
                    fkArtista: data.fkArtista,
                    fkAlbum: data.fkAlbum,
                    dataLancamento: dataLancamento,
                    fkUtilizador: data.fkUtilizador,
                    dataDeRegisto: dataDeRegistro
                }
            });
            return response;
        }
        catch (error) {
            throw new Error(`Failed to create musica: ${error.message}`);
        }
    }
    async update(data) {
        let dataLancamento;
        try {
            dataLancamento = new Date(data.dataLancamento).toISOString();
        }
        catch (error) {
            throw new Error('Invalid date value');
        }
        try {
            const response = await this.prisma.musica.update({
                where: { codMusica: data.codMusica },
                data: Object.assign(Object.assign({}, data), { dataLancamento }),
            });
            return response;
        }
        catch (error) {
            throw new Error(`Failed to update musica: ${error.message}`);
        }
    }
    async remove(id) {
        const response = await this.prisma.musica.delete({
            where: { codMusica: id },
        });
        return response;
    }
    async getOne(id) {
        const response = await this.prisma.musica.findUnique({
            where: { codMusica: id },
        });
        if (!response) {
            throw new common_1.NotFoundException(`Musica with ID ${id} not found`);
        }
        return response;
    }
    async listarMusicas() {
        const response = await this.prisma.musica.findMany({
            include: {
                album: true,
                grupoMusical: true,
                artista: true,
                registadopor: true,
            },
        });
        return response;
    }
    async downloadCapa(id) {
        const musica = await this.prisma.musica.findUnique({
            where: { codMusica: id },
        });
        if (musica === null) {
            throw new common_1.NotFoundException('Capa não encontrada para este Musica');
        }
        const filePath = path.join(__dirname, '..', '..', 'uploadmusicas', musica.capaMusica);
        if (!fs.existsSync(filePath)) {
            throw new common_1.NotFoundException('Capa não encontrada no sistema de arquivos');
        }
        return filePath;
    }
    async downloadMusic(id, range) {
        const music = await this.prisma.musica.findUnique({
            where: { codMusica: id },
        });
        if (!music) {
            throw new common_1.NotFoundException('Música não encontrada');
        }
        const filePath = path.join(__dirname, '..', '..', 'uploadmusicas', music.ficheiroMusical);
        if (!fs.existsSync(filePath)) {
            throw new common_1.NotFoundException('Música não encontrada no sistema de arquivos');
        }
        const fileStat = await fs.stat(filePath);
        const fileSize = fileStat.size;
        const CHUNK_SIZE = 100000;
        if (range) {
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : Math.min(start + CHUNK_SIZE - 1, fileSize - 1);
            const contentLength = end - start + 1;
            const headers = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': contentLength,
                'Content-Type': 'audio/mpeg',
            };
            return { headers, filePath, start, end };
        }
        else {
            const headers = {
                'Content-Length': fileSize,
                'Content-Type': 'audio/mpeg',
            };
            return { headers, filePath, start: 0, end: fileSize - 1 };
        }
    }
};
MusicaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MusicaService);
exports.MusicaService = MusicaService;
//# sourceMappingURL=musica.service.js.map