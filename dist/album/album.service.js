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
exports.AlbumService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const fs = require("fs-extra");
const path = require("path");
const winattr = require("winattr");
let AlbumService = class AlbumService {
    constructor(prisma) {
        this.prisma = prisma;
        this.CAPA_FOLDER = path.resolve(__dirname, '..', '..', 'upload', 'capas');
        if (!fs.existsSync(this.CAPA_FOLDER)) {
            fs.mkdirSync(this.CAPA_FOLDER, { recursive: true });
        }
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
            const response = await this.prisma.album.create({
                data: Object.assign(Object.assign({}, data), { dataLancamento,
                    dataDeRegistro }),
            });
            return response;
        }
        catch (error) {
            throw new Error(`Failed to create album: ${error.message}`);
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
            const response = await this.prisma.album.update({
                where: { codAlbum: data.codAlbum },
                data: Object.assign(Object.assign({}, data), { dataLancamento }),
            });
            return response;
        }
        catch (error) {
            throw new Error(`Failed to update album: ${error.message}`);
        }
    }
    async remove(id) {
        const response = await this.prisma.album.delete({
            where: { codAlbum: id },
        });
        return response;
    }
    async getOne(id) {
        const response = await this.prisma.album.findUnique({
            where: { codAlbum: id },
        });
        if (!response) {
            throw new common_1.NotFoundException(`Album with ID ${id} not found`);
        }
        return response;
    }
    async listarAlbuns() {
        const response = await this.prisma.album.findMany({
            include: {
                artista: true,
                grupoMusical: true,
                registadopor: true,
            },
        });
        return response;
    }
    async pesquisaPorTitulo(titulo) {
        const response = await this.prisma.album.findMany({
            where: {
                tituloAlbum: {
                    contains: titulo,
                },
            },
            include: {
                artista: true,
                grupoMusical: true,
                registadopor: true,
            },
        });
        return response;
    }
    async downloadCapa(id, destination) {
        const album = await this.prisma.album.findUnique({
            where: { codAlbum: id },
        });
        if (album === null) {
            throw new common_1.NotFoundException('Capa não encontrada para este álbum');
        }
        const filePath = path.join(__dirname, '..', '..', 'uploadcapas', album.capaAlbum);
        if (!fs.existsSync(filePath)) {
            throw new common_1.NotFoundException('Capa não encontrada no sistema de arquivos');
        }
        const destinationPath = path.join(destination, album.capaAlbum);
        await fs.ensureDir(path.dirname(destinationPath));
        await fs.copyFile(filePath, destinationPath);
        const destinationDir = path.dirname(destinationPath);
        winattr.set(destinationDir, { hidden: true }, (err) => {
            if (err)
                throw err;
        });
        console.log("Path:", destinationPath);
        return destinationPath;
    }
};
AlbumService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AlbumService);
exports.AlbumService = AlbumService;
//# sourceMappingURL=album.service.js.map