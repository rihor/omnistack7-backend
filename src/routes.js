const express = require("express");
const multer = require("multer"); // usado na rota de upload de post

const uploadConfig = require("./config/upload");
const PostController = require("./controllers/PostController");
const LikeController = require("./controllers/LikeController");

const routes = new express.Router();
// essa configuração do multer permite que o express entenda o Multipart Form
// que são arquivos físicos, texto, etc...
const upload = multer(uploadConfig);

// middlewares
routes.get("/posts", PostController.index);
routes.post("/posts", upload.single("image"), PostController.store);

routes.post("/posts/:id/like", LikeController.store);

module.exports = routes;
