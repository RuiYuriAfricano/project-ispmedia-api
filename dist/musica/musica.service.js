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
let MusicaService = class MusicaService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async add(data) {
        try {
            const response = await this.prisma.musica.create({ data });
            return response;
        }
        catch (error) {
            throw new Error(`Failed to create musica: ${error.message}`);
        }
    }
    async update(data) {
        try {
            const response = await this.prisma.musica.update({
                where: { codMusica: data.codMusica },
                data,
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
};
MusicaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MusicaService);
exports.MusicaService = MusicaService;
//# sourceMappingURL=musica.service.js.map