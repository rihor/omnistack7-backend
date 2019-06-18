// este arquivo é o ponto de entrada da aplicação
const express = require("express"); // permite lidar com rotas, parametros e respostas pro client
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

// permite suporte ao protocolo http
const server = require("http").Server(app);
/**
 * socket-io permite que todo usuário receba
 * atualizações do aplicativo em tempo real
 */
const io = require("socket.io")(server);

// conexão ao banco de dados
const user = "user";
const password = "123";
mongoose.connect(
  `mongodb://${user}:${password}@cluster0-shard-00-00-jyyyv.mongodb.net:27017,cluster0-shard-00-01-jyyyv.mongodb.net:27017,cluster0-shard-00-02-jyyyv.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`,
  { useNewUrlParser: true }
);

// repassa "io" para todas as outras middlewares / rotas
app.use((req, res, next) => {
  req.io = io;
  /**
   * next() garante que o proximo middleware seja executado
   * já que esse middleware intercepta a requisição antes
   */
  next();
});

// cors permite que todo tipo de aplicação acesse o backend
app.use(cors());

// sempre que usar o caminho files irá fazer referencia a esta pasta: resized
// rota para acessar arquivos estáticos salvos
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);

// importa e usa as rotas definidas
app.use(require("./routes"));

// ouve a porta 3333 ou a porta definida na variavel PORT do ambiente
const PORT = 3333;
server.listen(process.env.PORT || PORT);
