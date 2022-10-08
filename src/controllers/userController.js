const db = require('../database/database')

//criando uma função para listar usuários e passar como parâmetro na rota
async function listUsers(ctx){
    console.log(ctx)
    ctx.status = 200;
    ctx.body = {rows:db.listUsers()}
}

//criando uma função para adicionar usuários e passar como parâmetro na rota
async function createUser(ctx){
    const body = ctx.request.body
    const success = db.createUser(body)
    if(success){
        ctx.status = 200
        ctx.body = {}
    }else{
        ctx.status = 400
        ctx.body = {error: "Não foi possível adicionar usuário"}
    }
}

//criando uma função para deletar usuários e passar como parâmetro na rota
async function deleteUser(ctx){
    const nome = ctx.params.nome
    const success = db.deleteUser(nome)
    if(success){
        ctx.status = 200
        ctx.body = {}
    }else{
        ctx.status = 404
        ctx.body = {error: "Não foi possível deletar usuário"}
    }
}

//criando um export para as funções
module.exports = {
    listUsers,
    createUser,
    deleteUser,

};