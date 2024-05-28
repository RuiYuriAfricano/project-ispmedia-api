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
exports.UtilizadorController = void 0;
const common_1 = require("@nestjs/common");
const utilizador_service_1 = require("./utilizador.service");
const addUtilizadorDto_1 = require("./dto/addUtilizadorDto");
const updateUtilizadorDto_1 = require("./dto/updateUtilizadorDto");
let UtilizadorController = class UtilizadorController {
    constructor(utilizadorService) {
        this.utilizadorService = utilizadorService;
    }
    login(username, senha) {
        return this.utilizadorService.login(username, senha);
    }
    add(data) {
        return this.utilizadorService.add(data);
    }
    update(data) {
        return this.utilizadorService.update(data);
    }
    remove(id) {
        return this.utilizadorService.remove(id);
    }
    getOne(id) {
        return this.utilizadorService.getOne(id);
    }
    getOneByName(username) {
        return this.utilizadorService.getOneByName(username);
    }
};
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)('username')),
    __param(1, (0, common_1.Body)('senha')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UtilizadorController.prototype, "login", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addUtilizadorDto_1.AddUtilizadorDto]),
    __metadata("design:returntype", void 0)
], UtilizadorController.prototype, "add", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateUtilizadorDto_1.UpdateUtilizadorDto]),
    __metadata("design:returntype", void 0)
], UtilizadorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UtilizadorController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UtilizadorController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)('pesquisapornome'),
    __param(0, (0, common_1.Body)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UtilizadorController.prototype, "getOneByName", null);
UtilizadorController = __decorate([
    (0, common_1.Controller)('utilizador'),
    __metadata("design:paramtypes", [utilizador_service_1.UtilizadorService])
], UtilizadorController);
exports.UtilizadorController = UtilizadorController;
//# sourceMappingURL=utilizador.controller.js.map