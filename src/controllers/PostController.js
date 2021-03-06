const Post = require("../models/Post");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

module.exports = {
  async index(req, res) {
    // pega todos os Posts e ordena de forma decrescente
    const posts = await Post.find().sort("-createdAt");

    return res.json(posts);
  },

  async store(req, res) {
    const { author, place, description, hashtags } = req.body;
    const { filename: image } = req.file;

    // renomear a extensão
    const [name] = image.split('.');
    const fileName = `${name}.jpg`;

    // antes de criar o post no bd, a imagem será redimensionada
    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(req.file.destination, "resized", fileName));

    fs.unlinkSync(req.file.path);

    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: fileName
    });

    // emitir post via web-socket
    req.io.emit('post', post);

    return res.json(post);
  }
};
