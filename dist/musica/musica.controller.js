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
let MusicaController = class MusicaController {
    constructor(musicaService) {
        this.musicaService = musicaService;
    }
    add(data) {
        return this.musicaService.add(data);
    }
    update(data) {
        return this.musicaService.update(data);
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
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addMusicaDto_1.AddMusicaDto]),
    __metadata("design:returntype", void 0)
], MusicaController.prototype, "add", null);
__decorate([
    (0, common_1.Put)(),
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
    (0, common_1.Get)('listarMusicas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MusicaController.prototype, "listarMusicas", null);
MusicaController = __decorate([
    (0, common_1.Controller)('musica'),
    __metadata("design:paramtypes", [musica_service_1.MusicaService])
], MusicaController);
exports.MusicaController = MusicaController;
//# sourceMappingURL=musica.controller.js.map