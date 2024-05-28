-- CreateTable
CREATE TABLE `album` (
    `codAlbum` INTEGER NOT NULL AUTO_INCREMENT,
    `tituloAlbum` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `editora` VARCHAR(191) NOT NULL,
    `capaAlbum` VARCHAR(191) NOT NULL,
    `dataLancamento` DATETIME(3) NOT NULL,
    `dataDeRegistro` DATETIME(3) NOT NULL,
    `fkArtista` INTEGER NOT NULL,
    `fkGrupoMusical` INTEGER NOT NULL,

    PRIMARY KEY (`codAlbum`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grupoMusical` (
    `codGrupoMusical` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeGrupoMusical` VARCHAR(191) NOT NULL,
    `historia` VARCHAR(191) NOT NULL,
    `dataDeCriacao` DATETIME(3) NOT NULL,
    `dataDeRegisto` DATETIME(3) NOT NULL,

    PRIMARY KEY (`codGrupoMusical`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `artista` (
    `codArtista` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeArtista` VARCHAR(191) NOT NULL,
    `historia` VARCHAR(191) NOT NULL,
    `dataDeCriacao` DATETIME(3) NOT NULL,
    `dataDeRegisto` DATETIME(3) NOT NULL,
    `fkGrupoMusical` INTEGER NOT NULL,

    PRIMARY KEY (`codArtista`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `musica` (
    `codMusica` INTEGER NOT NULL AUTO_INCREMENT,
    `tituloMusica` VARCHAR(191) NOT NULL,
    `ficheiroMusical` VARCHAR(191) NOT NULL,
    `letra` VARCHAR(191) NOT NULL,
    `generoMusical` VARCHAR(191) NOT NULL,
    `compositor` VARCHAR(191) NOT NULL,
    `capaMusica` VARCHAR(191) NOT NULL,
    `fkAlbum` INTEGER NOT NULL,
    `fkGrupoMusical` INTEGER NOT NULL,
    `fkArtista` INTEGER NOT NULL,
    `dataLancamento` DATETIME(3) NOT NULL,
    `dataDeRegisto` DATETIME(3) NOT NULL,

    PRIMARY KEY (`codMusica`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `participacaoMusica` (
    `codParticipacaoMusica` INTEGER NOT NULL AUTO_INCREMENT,
    `fkArtista` INTEGER NOT NULL,
    `fkMusica` INTEGER NOT NULL,

    PRIMARY KEY (`codParticipacaoMusica`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `video` (
    `codVideo` INTEGER NOT NULL AUTO_INCREMENT,
    `tituloVideo` VARCHAR(191) NOT NULL,
    `ficheiroDoVideo` VARCHAR(191) NOT NULL,
    `legenda` VARCHAR(191) NOT NULL,
    `produtor` VARCHAR(191) NOT NULL,
    `generoDoVIdeo` VARCHAR(191) NOT NULL,
    `fkGrupoMusical` INTEGER NOT NULL,
    `fkArtista` INTEGER NOT NULL,
    `dataLancamento` DATETIME(3) NOT NULL,
    `dataDeRegisto` DATETIME(3) NOT NULL,

    PRIMARY KEY (`codVideo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `participacaoVideo` (
    `codParticipacaoVideo` INTEGER NOT NULL AUTO_INCREMENT,
    `fkArtista` INTEGER NOT NULL,
    `fkVideo` INTEGER NOT NULL,

    PRIMARY KEY (`codParticipacaoVideo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `utilizador` (
    `codUtilizador` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `tipoDeUtilizador` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`codUtilizador`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `criticas` (
    `codCritica` INTEGER NOT NULL AUTO_INCREMENT,
    `fkAlbum` INTEGER NOT NULL,
    `fkUtilizador` INTEGER NOT NULL,
    `pontuacao` INTEGER NOT NULL,
    `comentario` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`codCritica`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `partilhaDeConteudo` (
    `codPartilha` INTEGER NOT NULL AUTO_INCREMENT,
    `tipoDeConteudo` VARCHAR(191) NOT NULL,
    `fkVideo` INTEGER NOT NULL,
    `fkMusica` INTEGER NOT NULL,
    `fkAlbum` INTEGER NOT NULL,
    `fkGrupoDeAmigos` INTEGER NOT NULL,
    `fkUtilizador` INTEGER NOT NULL,

    PRIMARY KEY (`codPartilha`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `playlist` (
    `codPlayList` INTEGER NOT NULL AUTO_INCREMENT,
    `nomePlayList` VARCHAR(191) NOT NULL,
    `fkUtilizador` INTEGER NOT NULL,
    `tipoPlayList` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`codPlayList`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MusicasDaPlaylist` (
    `codMusicasDaPlayList` INTEGER NOT NULL AUTO_INCREMENT,
    `fkMusica` INTEGER NOT NULL,
    `fkPlayList` INTEGER NOT NULL,

    PRIMARY KEY (`codMusicasDaPlayList`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `videosDaPlaylist` (
    `codVideosDaPlayList` INTEGER NOT NULL AUTO_INCREMENT,
    `fkVideo` INTEGER NOT NULL,
    `fkPlayList` INTEGER NOT NULL,

    PRIMARY KEY (`codVideosDaPlayList`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grupoDeAmigos` (
    `codGrupoDeAmigos` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeDoGrupo` VARCHAR(191) NOT NULL,
    `fkCriador` INTEGER NOT NULL,
    `tipoDeGrupo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`codGrupoDeAmigos`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `membrosDosGrupos` (
    `codMembro` INTEGER NOT NULL AUTO_INCREMENT,
    `fkGrupoDeAmigos` INTEGER NOT NULL,
    `fkUtilizador` INTEGER NOT NULL,

    PRIMARY KEY (`codMembro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ownersDosGrupos` (
    `codOwner` INTEGER NOT NULL AUTO_INCREMENT,
    `fkGrupoDeAmigos` INTEGER NOT NULL,
    `fkUtilizador` INTEGER NOT NULL,

    PRIMARY KEY (`codOwner`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PedidoDeAdicaoNosGrupos` (
    `codPedido` INTEGER NOT NULL AUTO_INCREMENT,
    `fkGrupoDeAmigos` INTEGER NOT NULL,
    `fkUtilizador` INTEGER NOT NULL,
    `estadoDoPedido` INTEGER NOT NULL,

    PRIMARY KEY (`codPedido`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `listaDePartilha` (
    `codListaDePartilha` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeDaLista` VARCHAR(191) NOT NULL,
    `fkUtilizador` INTEGER NOT NULL,

    PRIMARY KEY (`codListaDePartilha`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `membrosDaListaDePartilhas` (
    `codMembroLista` INTEGER NOT NULL AUTO_INCREMENT,
    `fkGrupoDeAmigos` INTEGER NOT NULL,
    `fkListaDePartilha` INTEGER NOT NULL,

    PRIMARY KEY (`codMembroLista`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notificacao` (
    `codNotificacao` INTEGER NOT NULL AUTO_INCREMENT,
    `textoNotificacao` VARCHAR(191) NOT NULL,
    `fkUtilizador` INTEGER NOT NULL,
    `dataNotificacao` DATETIME(3) NOT NULL,

    PRIMARY KEY (`codNotificacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `album` ADD CONSTRAINT `album_fkArtista_fkey` FOREIGN KEY (`fkArtista`) REFERENCES `artista`(`codArtista`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `album` ADD CONSTRAINT `album_fkGrupoMusical_fkey` FOREIGN KEY (`fkGrupoMusical`) REFERENCES `grupoMusical`(`codGrupoMusical`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `artista` ADD CONSTRAINT `artista_fkGrupoMusical_fkey` FOREIGN KEY (`fkGrupoMusical`) REFERENCES `grupoMusical`(`codGrupoMusical`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `musica` ADD CONSTRAINT `musica_fkAlbum_fkey` FOREIGN KEY (`fkAlbum`) REFERENCES `album`(`codAlbum`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `musica` ADD CONSTRAINT `musica_fkGrupoMusical_fkey` FOREIGN KEY (`fkGrupoMusical`) REFERENCES `grupoMusical`(`codGrupoMusical`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `musica` ADD CONSTRAINT `musica_fkArtista_fkey` FOREIGN KEY (`fkArtista`) REFERENCES `artista`(`codArtista`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participacaoMusica` ADD CONSTRAINT `participacaoMusica_fkArtista_fkey` FOREIGN KEY (`fkArtista`) REFERENCES `artista`(`codArtista`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participacaoMusica` ADD CONSTRAINT `participacaoMusica_fkMusica_fkey` FOREIGN KEY (`fkMusica`) REFERENCES `musica`(`codMusica`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `video` ADD CONSTRAINT `video_fkGrupoMusical_fkey` FOREIGN KEY (`fkGrupoMusical`) REFERENCES `grupoMusical`(`codGrupoMusical`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `video` ADD CONSTRAINT `video_fkArtista_fkey` FOREIGN KEY (`fkArtista`) REFERENCES `artista`(`codArtista`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participacaoVideo` ADD CONSTRAINT `participacaoVideo_fkArtista_fkey` FOREIGN KEY (`fkArtista`) REFERENCES `artista`(`codArtista`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participacaoVideo` ADD CONSTRAINT `participacaoVideo_fkVideo_fkey` FOREIGN KEY (`fkVideo`) REFERENCES `video`(`codVideo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `criticas` ADD CONSTRAINT `criticas_fkAlbum_fkey` FOREIGN KEY (`fkAlbum`) REFERENCES `album`(`codAlbum`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `criticas` ADD CONSTRAINT `criticas_fkUtilizador_fkey` FOREIGN KEY (`fkUtilizador`) REFERENCES `utilizador`(`codUtilizador`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partilhaDeConteudo` ADD CONSTRAINT `partilhaDeConteudo_fkAlbum_fkey` FOREIGN KEY (`fkAlbum`) REFERENCES `album`(`codAlbum`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partilhaDeConteudo` ADD CONSTRAINT `partilhaDeConteudo_fkUtilizador_fkey` FOREIGN KEY (`fkUtilizador`) REFERENCES `utilizador`(`codUtilizador`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partilhaDeConteudo` ADD CONSTRAINT `partilhaDeConteudo_fkVideo_fkey` FOREIGN KEY (`fkVideo`) REFERENCES `video`(`codVideo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partilhaDeConteudo` ADD CONSTRAINT `partilhaDeConteudo_fkMusica_fkey` FOREIGN KEY (`fkMusica`) REFERENCES `musica`(`codMusica`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `playlist` ADD CONSTRAINT `playlist_fkUtilizador_fkey` FOREIGN KEY (`fkUtilizador`) REFERENCES `utilizador`(`codUtilizador`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MusicasDaPlaylist` ADD CONSTRAINT `MusicasDaPlaylist_fkMusica_fkey` FOREIGN KEY (`fkMusica`) REFERENCES `musica`(`codMusica`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MusicasDaPlaylist` ADD CONSTRAINT `MusicasDaPlaylist_fkPlayList_fkey` FOREIGN KEY (`fkPlayList`) REFERENCES `playlist`(`codPlayList`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `videosDaPlaylist` ADD CONSTRAINT `videosDaPlaylist_fkVideo_fkey` FOREIGN KEY (`fkVideo`) REFERENCES `video`(`codVideo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `videosDaPlaylist` ADD CONSTRAINT `videosDaPlaylist_fkPlayList_fkey` FOREIGN KEY (`fkPlayList`) REFERENCES `playlist`(`codPlayList`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grupoDeAmigos` ADD CONSTRAINT `grupoDeAmigos_fkCriador_fkey` FOREIGN KEY (`fkCriador`) REFERENCES `utilizador`(`codUtilizador`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `membrosDosGrupos` ADD CONSTRAINT `membrosDosGrupos_fkUtilizador_fkey` FOREIGN KEY (`fkUtilizador`) REFERENCES `utilizador`(`codUtilizador`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `membrosDosGrupos` ADD CONSTRAINT `membrosDosGrupos_fkGrupoDeAmigos_fkey` FOREIGN KEY (`fkGrupoDeAmigos`) REFERENCES `grupoDeAmigos`(`codGrupoDeAmigos`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ownersDosGrupos` ADD CONSTRAINT `ownersDosGrupos_fkUtilizador_fkey` FOREIGN KEY (`fkUtilizador`) REFERENCES `utilizador`(`codUtilizador`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ownersDosGrupos` ADD CONSTRAINT `ownersDosGrupos_fkGrupoDeAmigos_fkey` FOREIGN KEY (`fkGrupoDeAmigos`) REFERENCES `grupoDeAmigos`(`codGrupoDeAmigos`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidoDeAdicaoNosGrupos` ADD CONSTRAINT `PedidoDeAdicaoNosGrupos_fkUtilizador_fkey` FOREIGN KEY (`fkUtilizador`) REFERENCES `utilizador`(`codUtilizador`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidoDeAdicaoNosGrupos` ADD CONSTRAINT `PedidoDeAdicaoNosGrupos_fkGrupoDeAmigos_fkey` FOREIGN KEY (`fkGrupoDeAmigos`) REFERENCES `grupoDeAmigos`(`codGrupoDeAmigos`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `listaDePartilha` ADD CONSTRAINT `listaDePartilha_fkUtilizador_fkey` FOREIGN KEY (`fkUtilizador`) REFERENCES `utilizador`(`codUtilizador`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `membrosDaListaDePartilhas` ADD CONSTRAINT `membrosDaListaDePartilhas_fkGrupoDeAmigos_fkey` FOREIGN KEY (`fkGrupoDeAmigos`) REFERENCES `grupoDeAmigos`(`codGrupoDeAmigos`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `membrosDaListaDePartilhas` ADD CONSTRAINT `membrosDaListaDePartilhas_fkListaDePartilha_fkey` FOREIGN KEY (`fkListaDePartilha`) REFERENCES `listaDePartilha`(`codListaDePartilha`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notificacao` ADD CONSTRAINT `notificacao_fkUtilizador_fkey` FOREIGN KEY (`fkUtilizador`) REFERENCES `utilizador`(`codUtilizador`) ON DELETE RESTRICT ON UPDATE CASCADE;
