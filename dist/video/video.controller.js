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
exports.VideoController = void 0;
const common_1 = require("@nestjs/common");
const video_service_1 = require("./video.service");
const addVideoDto_1 = require("./dto/addVideoDto");
const updateVideoDto_1 = require("./dto/updateVideoDto");
const multer_1 = require("multer");
const platform_express_1 = require("@nestjs/platform-express");
const fs = require("fs-extra");
let VideoController = class VideoController {
    constructor(videoService) {
        this.videoService = videoService;
    }
    add(data) {
        return this.videoService.add(Object.assign(Object.assign({}, data), { "fkUtilizador": Number(data.fkUtilizador), "fkArtista": Number(data.fkArtista) || null, "fkGrupoMusical": Number(data.fkGrupoMusical) || null }));
    }
    update(data) {
        return this.videoService.update(Object.assign(Object.assign({}, data), { "codVideo": Number(data.codVideo), "fkUtilizador": Number(data.fkUtilizador), "fkArtista": Number(data.fkArtista) || null, "fkGrupoMusical": Number(data.fkGrupoMusical) || null }));
    }
    remove(id) {
        return this.videoService.remove(id);
    }
    getOne(id) {
        return this.videoService.getOne(id);
    }
    listarVideos() {
        return this.videoService.listarVideos();
    }
    async downloadVideo(id, res, headers) {
        const range = headers.range;
        try {
            const { headers: videoHeaders, filePath, start, end } = await this.videoService.downloadVideo(id, range);
            const videoStream = fs.createReadStream(filePath, { start, end });
            res.writeHead(range ? 206 : 200, videoHeaders);
            videoStream.pipe(res);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 1, {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, callback) => {
                const uploadPath = 'uploadvideos';
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
    __metadata("design:paramtypes", [addVideoDto_1.AddVideoDto]),
    __metadata("design:returntype", void 0)
], VideoController.prototype, "add", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 1, {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, callback) => {
                const uploadPath = 'uploadvideos';
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
    __metadata("design:paramtypes", [updateVideoDto_1.UpdateVideoDto]),
    __metadata("design:returntype", void 0)
], VideoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VideoController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VideoController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)('listarVideos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VideoController.prototype, "listarVideos", null);
__decorate([
    (0, common_1.Get)('downloadVideo/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "downloadVideo", null);
VideoController = __decorate([
    (0, common_1.Controller)('video'),
    __metadata("design:paramtypes", [video_service_1.VideoService])
], VideoController);
exports.VideoController = VideoController;
//# sourceMappingURL=video.controller.js.map