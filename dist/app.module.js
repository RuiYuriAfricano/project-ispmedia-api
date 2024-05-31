"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const utilizador_module_1 = require("./utilizador/utilizador.module");
const grupoMusical_module_1 = require("./grupomusical/grupoMusical.module");
const artista_module_1 = require("./artista/artista.module");
const album_module_1 = require("./album/album.module");
const musica_module_1 = require("./musica/musica.module");
const video_module_1 = require("./video/video.module");
const participacaoVideo_module_1 = require("./participacaoVideo/participacaoVideo.module");
const participacaoMusica_module_1 = require("./participacaoMusica/participacaoMusica.module");
const prisma_service_1 = require("./prisma/prisma.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [utilizador_module_1.UtilizadorModule, grupoMusical_module_1.GrupoMusicalModule, artista_module_1.ArtistaModule, album_module_1.AlbumModule, musica_module_1.MusicaModule,
            video_module_1.VideoModule, participacaoVideo_module_1.ParticipacaoVideoModule, participacaoMusica_module_1.ParticipacaoMusicaModule],
        providers: [prisma_service_1.PrismaService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map