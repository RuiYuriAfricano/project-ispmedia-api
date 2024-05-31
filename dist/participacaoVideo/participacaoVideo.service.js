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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipacaoVideoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ParticipacaoVideoService = class ParticipacaoVideoService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async add(data) {
        try {
            const response = await this.prisma.participacaoVideo.create({ data });
            return response;
        }
        catch (error) {
            throw new Error(`Failed to create participation: ${error.message}`);
        }
    }
    async update(data) {
        try {
            const { codParticipacaoVideo } = data, rest = __rest(data, ["codParticipacaoVideo"]);
            const response = await this.prisma.participacaoVideo.update({
                where: { codParticipacaoVideo },
                data: rest,
            });
            return response;
        }
        catch (error) {
            throw new Error(`Failed to update participation: ${error.message}`);
        }
    }
    async remove(id) {
        const response = await this.prisma.participacaoVideo.delete({
            where: { codParticipacaoVideo: id },
        });
        return response;
    }
    async getOne(id) {
        const response = await this.prisma.participacaoVideo.findUnique({
            where: { codParticipacaoVideo: id },
        });
        if (!response) {
            throw new common_1.NotFoundException(`Participation with ID ${id} not found`);
        }
        return response;
    }
    async listarParticipacoes() {
        const response = await this.prisma.participacaoVideo.findMany();
        return response;
    }
};
ParticipacaoVideoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ParticipacaoVideoService);
exports.ParticipacaoVideoService = ParticipacaoVideoService;
//# sourceMappingURL=participacaoVideo.service.js.map