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
exports.GrupoMusicalController = void 0;
const common_1 = require("@nestjs/common");
const grupoMusical_service_1 = require("./grupoMusical.service");
const addGrupoMusicalDto_1 = require("./dto/addGrupoMusicalDto");
const updateGrupoMusicalDto_1 = require("./dto/updateGrupoMusicalDto");
let GrupoMusicalController = class GrupoMusicalController {
    constructor(grupoMusical) {
        this.grupoMusical = grupoMusical;
    }
    add(data) {
        return this.grupoMusical.add(data);
    }
    update(data) {
        return this.grupoMusical.update(data);
    }
    remove(id) {
        return this.grupoMusical.remove(id);
    }
    getOne(id) {
        return this.grupoMusical.getOne(id);
    }
    getOneByName(nomeGrupoMusical) {
        return this.grupoMusical.getOneByName(nomeGrupoMusical);
    }
    listarGruposMusicais() {
        return this.grupoMusical.listarGruposMusicais();
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addGrupoMusicalDto_1.AddGrupoMusicalDto]),
    __metadata("design:returntype", void 0)
], GrupoMusicalController.prototype, "add", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateGrupoMusicalDto_1.UpdateGrupoMusicalDto]),
    __metadata("design:returntype", void 0)
], GrupoMusicalController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], GrupoMusicalController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], GrupoMusicalController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)('pesquisapornome'),
    __param(0, (0, common_1.Body)('nomeGrupoMusical')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GrupoMusicalController.prototype, "getOneByName", null);
__decorate([
    (0, common_1.Post)('listarGruposMusicais'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GrupoMusicalController.prototype, "listarGruposMusicais", null);
GrupoMusicalController = __decorate([
    (0, common_1.Controller)('grupoMusical'),
    __metadata("design:paramtypes", [grupoMusical_service_1.GrupoMusicalService])
], GrupoMusicalController);
exports.GrupoMusicalController = GrupoMusicalController;
//# sourceMappingURL=grupoMusical.controller.js.map