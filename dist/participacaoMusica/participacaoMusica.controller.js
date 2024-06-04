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
exports.ParticipacaoMusicaController = void 0;
const common_1 = require("@nestjs/common");
const participacaoMusica_service_1 = require("./participacaoMusica.service");
const addParticipacaoMusicaDto_1 = require("./dto/addParticipacaoMusicaDto");
const updateParticipacaoMusicaDto_1 = require("./dto/updateParticipacaoMusicaDto");
let ParticipacaoMusicaController = class ParticipacaoMusicaController {
    constructor(participacaoMusicaService) {
        this.participacaoMusicaService = participacaoMusicaService;
    }
    add(data) {
        return this.participacaoMusicaService.add({
            fkArtista: Number(data.fkArtista),
            fkMusica: Number(data.fkMusica)
        });
    }
    update(id, data) {
        return this.participacaoMusicaService.update(Object.assign(Object.assign({}, data), { codParticipacaoMusica: +id }));
    }
    remove(id) {
        return this.participacaoMusicaService.remove(+id);
    }
    getOne(id) {
        return this.participacaoMusicaService.getOne(+id);
    }
    listarParticipacoes() {
        return this.participacaoMusicaService.listarParticipacoes();
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addParticipacaoMusicaDto_1.AddParticipacaoMusicaDto]),
    __metadata("design:returntype", void 0)
], ParticipacaoMusicaController.prototype, "add", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateParticipacaoMusicaDto_1.UpdateParticipacaoMusicaDto]),
    __metadata("design:returntype", void 0)
], ParticipacaoMusicaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ParticipacaoMusicaController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ParticipacaoMusicaController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)("listarParticipacaoMusica"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ParticipacaoMusicaController.prototype, "listarParticipacoes", null);
ParticipacaoMusicaController = __decorate([
    (0, common_1.Controller)('participacaoMusica'),
    __metadata("design:paramtypes", [participacaoMusica_service_1.ParticipacaoMusicaService])
], ParticipacaoMusicaController);
exports.ParticipacaoMusicaController = ParticipacaoMusicaController;
//# sourceMappingURL=participacaoMusica.controller.js.map