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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicaController = void 0;
const common_1 = require("@nestjs/common");
const musica_service_1 = require("./musica.service");
const addMusicaDto_1 = require("./dto/addMusicaDto");
const updateMusicaDto_1 = require("./dto/updateMusicaDto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const fs = require("fs-extra");
let MusicaController = class MusicaController {
    constructor(musicaService) {
        this.musicaService = musicaService;
    }
    add(data) {
        return this.musicaService.add(Object.assign(Object.assign({}, data), { "fkUtilizador": Number(data.fkUtilizador), "fkAlbum": Number(data.fkAlbum) || null, "fkArtista": Number(data.fkArtista) || null, "fkGrupoMusical": Number(data.fkGrupoMusical) || null }));
    }
    update(data) {
        return this.musicaService.update(Object.assign(Object.assign({}, data), { "codMusica": Number(data.codMusica), "fkUtilizador": Number(data.fkUtilizador), "fkAlbum": Number(data.fkAlbum) || null, "fkArtista": Number(data.fkArtista) || null, "fkGrupoMusical": Number(data.fkGrupoMusical) || null }));
    }
    remove(id) {
        return this.musicaService.remove(id);
    }
    getOne(id) {
        return this.musicaService.getOne(id);
    }
    listarMusicas() {
        return this.musicaService.listarMusicas();
    }
    async downloadCapa(id, res) {
        const filePath = await this.musicaService.downloadCapa(id);
        return res.sendFile(filePath);
    }
    async downloadMusic(id, res, headers) {
        const range = headers.range;
        try {
            const { headers: musicHeaders, filePath, start, end } = await this.musicaService.downloadMusic(Number(id), range);
            const musicStream = fs.createReadStream(filePath, { start, end });
            res.writeHead(range ? 206 : 200, musicHeaders);
            musicStream.pipe(res);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 2, {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, callback) => {
                const uploadPath = 'uploadmusicas';
                fs.ensureDirSync(uploadPath);
                callback(null, uploadPath);
            },
            filename: (req, file, callback) => {
                callback(null, file.originalname);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addMusicaDto_1.AddMusicaDto]),
    __metadata("design:returntype", void 0)
], MusicaController.prototype, "add", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 2, {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, callback) => {
                const uploadPath = 'uploadmusicas';
                fs.ensureDirSync(uploadPath);
                callback(null, uploadPath);
            },
            filename: (req, file, callback) => {
                callback(null, file.originalname);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateMusicaDto_1.UpdateMusicaDto]),
    __metadata("design:returntype", void 0)
], MusicaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MusicaController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MusicaController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)('listarMusicas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MusicaController.prototype, "listarMusicas", null);
__decorate([
    (0, common_1.Get)('downloadCapa/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MusicaController.prototype, "downloadCapa", null);
__decorate([
    (0, common_1.Get)('downloadMusica/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], MusicaController.prototype, "downloadMusic", null);
MusicaController = __decorate([
    (0, common_1.Controller)('musica'),
    __metadata("design:paramtypes", [musica_service_1.MusicaService])
], MusicaController);
exports.MusicaController = MusicaController;
//# sourceMappingURL=musica.controller.js.map