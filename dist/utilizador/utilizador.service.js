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
exports.UtilizadorService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const fs = require("fs-extra");
const path = require("path");
let UtilizadorService = class UtilizadorService {
    constructor(prisma) {
        this.prisma = prisma;
        this.AVATAR_FOLDER = path.resolve(__dirname, '..', '..', 'conta-usuario');
        if (!fs.existsSync(this.AVATAR_FOLDER)) {
            fs.mkdirSync(this.AVATAR_FOLDER, { recursive: true });
        }
    }
    async login(username, senha) {
        const utilizador = await this.prisma.utilizador.findFirst({
            where: {
                username: username,
                senha: senha,
            },
        });
        if (!utilizador) {
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        return utilizador;
    }
    async add(data) {
        const utilizador = await this.prisma.utilizador.create({ data });
        return utilizador;
    }
    async update(data) {
        data.codUtilizador = Number(data === null || data === void 0 ? void 0 : data.codUtilizador);
        const utilizador = await this.prisma.utilizador.update({
            where: {
                codUtilizador: data.codUtilizador,
            },
            data,
        });
        return utilizador;
    }
    async remove(id) {
        const response = await this.prisma.utilizador.delete({
            where: { codUtilizador: id },
        });
        return response;
    }
    async getOne(id) {
        const utilizador = await this.prisma.utilizador.findUnique({
            where: {
                codUtilizador: id,
            },
        });
        return utilizador;
    }
    async getOneByName(username) {
        const utilizador = await this.prisma.utilizador.findUnique({
            where: {
                username: username,
            },
        });
        return utilizador;
    }
    async listarUtilizadores() {
        const utilizadores = await this.prisma.utilizador.findMany();
        return utilizadores;
    }
    async downloadFoto(username) {
        const utilizador = await this.prisma.utilizador.findUnique({
            where: {
                username: username,
            },
        });
        if (!utilizador || !utilizador.fotografia) {
            throw new common_1.NotFoundException('Foto não encontrada para este usuário');
        }
        const filePath = path.join(__dirname, '..', '..', 'upload', utilizador.fotografia);
        if (!fs.existsSync(filePath)) {
            throw new common_1.NotFoundException('Foto não encontrada no sistema de arquivos');
        }
        return filePath;
    }
};
UtilizadorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UtilizadorService);
exports.UtilizadorService = UtilizadorService;
//# sourceMappingURL=utilizador.service.js.map