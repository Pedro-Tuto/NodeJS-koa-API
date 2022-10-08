//importando um validador para e-mail
var validator = require("email-validator");

//lista para receber os dados
const db = [];

//valida um usuário para ter certeza que os atributos existem e são válidos
function validateUser(user) {
  if (
    typeof user.nome === "string" &&
    typeof user.idade === "number" &&
    validator.validate(user.email)
  ) {
    return true;
  } else {
    return false;
  }
}

//criando uma função para adicionar novo usuário
function createUser(user) {
  if (validateUser(user)) {
    db.push(user);
    console.log(db);
    return true;
  } else {
    return false;
  }
}

//criando uma função para retornar a lista de usuários adicionados
function listUsers() {
  return db;
}

//criando uma função para remover um usuário da lista
function deleteUser(nome) {
  const index = db.findIndex((u) => u.nome === nome);
  if (index >= 0) {
    db.splice(index, 1);
    console.log(db);
    return true;
  } else {
    return false;
  }
}

//criando uma função para atualizar um usuário da lista
function updateUser(nome, user) {
  const index = db.findIndex((u) => u.nome === nome);
  if (index >= 0 && validateUser(user)) {
    db.splice(index, 1, user);
    console.log(db);
    return true;
  } else {
    return false;
  }
}

//exportando as funções
module.exports = {
  createUser,
  listUsers,
  deleteUser,
  updateUser,
};
