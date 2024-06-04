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
exports.ParticipacaoVideoController = void 0;
const common_1 = require("@nestjs/common");
const participacaoVideo_service_1 = require("./participacaoVideo.service");
const addParticipacaoVideoDto_1 = require("./dto/addParticipacaoVideoDto");
const updateParticipacaoVideoDto_1 = require("./dto/updateParticipacaoVideoDto");
let ParticipacaoVideoController = class ParticipacaoVideoController {
    constructor(participacaoVideoService) {
        this.participacaoVideoService = participacaoVideoService;
    }
    add(data) {
        return this.participacaoVideoService.add({
            fkArtista: Number(data.fkArtista),
            fkVideo: Number(data.fkVideo)
        });
    }
    update(id, data) {
        return this.participacaoVideoService.update(Object.assign(Object.assign({}, data), { codParticipacaoVideo: +id }));
    }
    remove(id) {
        return this.participacaoVideoService.remove(+id);
    }
    getOne(id) {
        return this.participacaoVideoService.getOne(+id);
    }
    listarParticipacoes() {
        return this.participacaoVideoService.listarParticipacoes();
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addParticipacaoVideoDto_1.AddParticipacaoVideoDto]),
    __metadata("design:returntype", void 0)
], ParticipacaoVideoController.prototype, "add", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateParticipacaoVideoDto_1.UpdateParticipacaoVideoDto]),
    __metadata("design:returntype", void 0)
], ParticipacaoVideoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ParticipacaoVideoController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ParticipacaoVideoController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)("listarParticipacaoVideo"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ParticipacaoVideoController.prototype, "listarParticipacoes", null);
ParticipacaoVideoController = __decorate([
    (0, common_1.Controller)('participacaoVideo'),
    __metadata("design:paramtypes", [participacaoVideo_service_1.ParticipacaoVideoService])
], ParticipacaoVideoController);
exports.ParticipacaoVideoController = ParticipacaoVideoController;
//# sourceMappingURL=participacaoVideo.controller.js.map