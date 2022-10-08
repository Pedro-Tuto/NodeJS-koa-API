//importando um validador para e-mail
var validator = require("email-validator");

//inicializando uma lista para receber os dados
const db = []

function validateUser(user){
    if(typeof(user.nome) === "string" && typeof(user.idade) === "number" && validator.validate(user.email)){
        return true
    }else{
        return false
    }
}

//criando uma função para adicionar novo usuário
function createUser(user){
    if(validateUser(user)){
        db.push(user)
        console.log(db)
        return true
    }else{
        return false
    }
}

//criando uma função para retornar a lista de usuários adicionados
function listUsers(){
    return db
}

//criando uma função para remover um usuário da lista
function deleteUser(nome){
    const index = db.findIndex((user)=> user.nome === nome)
    if(index >= 0){
        db.splice(index, 1)
        console.log(db)
        return true
    }else{
        return false
    }
}

//criando uma função para atualizar um usuário da lista

function updateUser(i, j){
    db.fill(i,j)
    console.log(db)
}

//exportando as funções
module.exports = {
    createUser,
    listUsers,
    deleteUser,
    updateUser,

}