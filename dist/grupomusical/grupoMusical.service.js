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
exports.GrupoMusicalService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let GrupoMusicalService = class GrupoMusicalService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async add(data) {
        const currentDate = new Date().toISOString();
        let dataDeCriacao;
        try {
            dataDeCriacao = data.dataDeCriacao ? new Date(data.dataDeCriacao).toISOString() : currentDate;
        }
        catch (error) {
            throw new Error('Invalid dataDeRegisto value ' + dataDeCriacao);
        }
        try {
            const response = await this.prisma.grupoMusical.create({
                data: Object.assign(Object.assign({}, data), { dataDeCriacao: dataDeCriacao, dataDeRegisto: currentDate }),
            });
            return response;
        }
        catch (error) {
            throw new Error(`Failed to create grupoMusical: ${error.message}`);
        }
    }
    async update(data) {
        const currentDate = new Date().toISOString();
        let dataDeCriacao;
        try {
            dataDeCriacao = data.dataDeCriacao ? new Date(data.dataDeCriacao).toISOString() : currentDate;
        }
        catch (error) {
            throw new Error('Invalid dataDeRegisto value ' + dataDeCriacao);
        }
        data.codGrupoMusical = Number(data === null || data === void 0 ? void 0 : data.codGrupoMusical);
        const response = await this.prisma.grupoMusical.update({
            where: {
                codGrupoMusical: data.codGrupoMusical,
            },
            data: Object.assign(Object.assign({}, data), { dataDeCriacao: dataDeCriacao }),
        });
        return response;
    }
    async remove(id) {
        const response = await this.prisma.grupoMusical.delete({
            where: { codGrupoMusical: id },
        });
        return response;
    }
    async getOne(id) {
        const response = await this.prisma.grupoMusical.findUnique({
            where: {
                codGrupoMusical: id,
            },
        });
        return response;
    }
    async getOneByName(nomeGrupoMusical) {
        const response = await this.prisma.grupoMusical.findFirst({
            where: {
                nomeGrupoMusical: nomeGrupoMusical,
            },
        });
        return response;
    }
    async listarGruposMusicais() {
        const response = await this.prisma.grupoMusical.findMany({
            include: {
                registadopor: {
                    select: {
                        username: true,
                    },
                },
            },
        });
        return response;
    }
};
GrupoMusicalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GrupoMusicalService);
exports.GrupoMusicalService = GrupoMusicalService;
//# sourceMappingURL=grupoMusical.service.js.map