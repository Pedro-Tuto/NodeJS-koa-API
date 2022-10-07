const db = require('../database/database')
db.createUser("Fulano")

//criando uma função para listar usuários e passar como parâmetro na rota
async function listUsers(ctx){
    console.log(ctx)
    ctx.status = 200;
    ctx.body = {rows:db.listUsers()}
}

//criando um export para as funções
module.exports = {
    listUsers,

};