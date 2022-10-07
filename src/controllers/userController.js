const db = require('../database/database')
db.createUser("Fulano")

//criando uma função para listar usuários e passar como parâmetro na rota
async function listUsers(ctx){
    console.log(ctx)
    ctx.status = 200;
    ctx.body = {rows:db.listUsers()}
}

//criando uma função para adicionar usuários e passar como parâmetro na rota
async function createUsers(ctx){
    console.log(ctx)
    ctx.status = 200;
    const body = ctx.request.body
    db.createUser(body)
}

//criando um export para as funções
module.exports = {
    listUsers,
    createUsers,

};