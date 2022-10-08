//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router

// todas as configuraçoes devem ser passadas via environment variables
const PORT = process.env.PORT || 3000;

const Koa = require("koa");
const Router = require("koa-router");

//importando as funções de usuário
const userController = require("./controllers/userController");

//inicializando o koa-json
const json = require("koa-json");

const bodyparser = require("koa-bodyparser");

const koa = new Koa();
const router = new Router();

//middleware para tratamento json e de body
koa.use(json());
koa.use(bodyparser());

//rota simples pra testar se o servidor está online
router.get("/", async (ctx) => {
  ctx.body = { msg: `Seu servidor esta rodando em http://localhost:${PORT}` };
});

//As rotas devem ficar em arquivos separados, /src/controllers/userController.js por exemplo
router.get("/users", userController.listUsers);
router.post("/users", userController.createUser);
router.delete("/users/:nome", userController.deleteUser);
router.put("/users/:nome", userController.updateUser);
router.get("/users/:nome", userController.getUser);

koa.use(router.routes()).use(router.allowedMethods());

const server = koa.listen(PORT);

module.exports = server;
