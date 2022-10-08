const db = require("../database/database");

//função para listar usuários e passar como parâmetro na rota
async function listUsers(ctx) {
  ctx.status = 200;
  ctx.body = { rows: db.listUsers() };
}

//função para pegar um usuário específico
async function getUser(ctx) {
  const nome = ctx.params.nome;
  const user = db.getUser(nome);
  if (user != null) {
    ctx.status = 200;
    ctx.body = user;
  } else {
    ctx.status = 404;
    ctx.body = { error: "Não foi possível encontrar este usuário" };
  }
}

//função para adicionar usuários e passar como parâmetro na rota
async function createUser(ctx) {
  const user = ctx.request.body;
  const success = db.createUser(user);
  if (success) {
    ctx.status = 201;
    ctx.body = {};
  } else {
    ctx.status = 400;
    ctx.body = { error: "Não foi possível adicionar usuário" };
  }
}

//função para deletar usuários e passar como parâmetro na rota
async function deleteUser(ctx) {
  const nome = ctx.params.nome;
  const success = db.deleteUser(nome);
  if (success) {
    ctx.status = 200;
    ctx.body = {};
  } else {
    ctx.status = 404;
    ctx.body = { error: "Não foi possível deletar usuário" };
  }
}

//função para atualizar um usuário existente
async function updateUser(ctx) {
  const nome = ctx.params.nome;
  const user = ctx.request.body;
  const success = db.updateUser(nome, user);
  if (success) {
    ctx.status = 200;
    ctx.body = {};
  } else {
    ctx.status = 400;
    ctx.body = { error: "Não foi possível atualizar usuário" };
  }
}

//exportando as funções
module.exports = {
  listUsers,
  createUser,
  deleteUser,
  updateUser,
  getUser,
};
