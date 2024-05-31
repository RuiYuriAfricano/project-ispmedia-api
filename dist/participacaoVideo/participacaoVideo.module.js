"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipacaoVideoModule = void 0;
const common_1 = require("@nestjs/common");
const participacaoVideo_service_1 = require("./participacaoVideo.service");
const participacaoVideo_controller_1 = require("./participacaoVideo.controller");
const prisma_service_1 = require("../prisma/prisma.service");
let ParticipacaoVideoModule = class ParticipacaoVideoModule {
};
ParticipacaoVideoModule = __decorate([
    (0, common_1.Module)({
        controllers: [participacaoVideo_controller_1.ParticipacaoVideoController],
        providers: [participacaoVideo_service_1.ParticipacaoVideoService, prisma_service_1.PrismaService],
    })
], ParticipacaoVideoModule);
exports.ParticipacaoVideoModule = ParticipacaoVideoModule;
//# sourceMappingURL=participacaoVideo.module.js.map