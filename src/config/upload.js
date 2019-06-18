const multer = require("multer");
const path = require("path");

module.exports = {
  storage: new multer.diskStorage({
    // destino para aonde será salvo a imagem
    destination: path.resolve(__dirname, "..", "..", "uploads"),
    filename: function(req, file, callback) {
      // salva com o nome original da imagem
      callback(null, file.originalname);
    }
  })
};
