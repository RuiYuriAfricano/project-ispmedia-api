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
exports.AlbumController = void 0;
const common_1 = require("@nestjs/common");
const album_service_1 = require("./album.service");
const addAlbumDto_1 = require("./dto/addAlbumDto");
const updateAlbumDto_1 = require("./dto/updateAlbumDto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const fs = require("fs-extra");
let AlbumController = class AlbumController {
    constructor(albumService) {
        this.albumService = albumService;
    }
    add(data, file) {
        return this.albumService.add(Object.assign(Object.assign({}, data), { "fkUtilizador": Number(data.fkUtilizador), "fkArtista": Number(data.fkArtista) || null, "fkGrupoMusical": Number(data.fkGrupoMusical) || null }));
    }
    update(data, file) {
        const updateData = Object.assign(Object.assign({}, data), { codAlbum: Number(data.codAlbum), fkUtilizador: Number(data.fkUtilizador), fkArtista: Number(data.fkArtista) || null, fkGrupoMusical: Number(data.fkGrupoMusical) || null });
        if (file) {
            updateData.capaAlbum = file.filename;
        }
        return this.albumService.update(updateData);
    }
    remove(id) {
        return this.albumService.remove(id);
    }
    getOne(id) {
        return this.albumService.getOne(id);
    }
    listarAlbuns() {
        return this.albumService.listarAlbuns();
    }
    pesquisaPorTitulo(titulo) {
        return this.albumService.pesquisaPorTitulo(titulo);
    }
    async downloadCapa(id, res) {
        const filePath = await this.albumService.downloadCapa(id);
        return res.sendFile(filePath);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 1, {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, callback) => {
                const uploadPath = 'uploadcapasalbum';
                fs.ensureDirSync(uploadPath);
                callback(null, uploadPath);
            },
            filename: (req, file, callback) => {
                callback(null, file.originalname);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addAlbumDto_1.AddAlbumDto, Object]),
    __metadata("design:returntype", void 0)
], AlbumController.prototype, "add", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 1, {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, callback) => {
                const uploadPath = 'uploadcapasalbum';
                fs.ensureDirSync(uploadPath);
                callback(null, uploadPath);
            },
            filename: (req, file, callback) => {
                callback(null, file.originalname);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateAlbumDto_1.UpdateAlbumDto, Object]),
    __metadata("design:returntype", void 0)
], AlbumController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AlbumController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AlbumController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)('listarAlbuns'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AlbumController.prototype, "listarAlbuns", null);
__decorate([
    (0, common_1.Get)('pesquisaPorTitulo/:tituloAlbum'),
    __param(0, (0, common_1.Param)('tituloAlbum')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AlbumController.prototype, "pesquisaPorTitulo", null);
__decorate([
    (0, common_1.Get)('downloadCapa/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "downloadCapa", null);
AlbumController = __decorate([
    (0, common_1.Controller)('album'),
    __metadata("design:paramtypes", [album_service_1.AlbumService])
], AlbumController);
exports.AlbumController = AlbumController;
//# sourceMappingURL=album.controller.js.map