//inicializando uma lista para receber os dados
const db = []

//criando uma função para adicionar novo usuário
function createUser(user){
    db.push(user)
    console.log(db)
}

//criando uma função para retornar a lista de usuários adicionados
function listUsers(){
    return db
}

//criando uma função para remover um usuário da lista
function removeUsers(i, j){
    db.splice(i,j)
    console.log(db)
}

//criando uma função para atualizar um usuário da lista

function updateUsers(i, j){
    db.fill(i,j)
    console.log(db)
}

//exportando as funções
module.exports = {
    createUser,
    listUsers,
    removeUsers,
    updateUsers,

}