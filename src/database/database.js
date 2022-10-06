const db = []

function createUser(user){
    db.push(user)
}

function listUsers(){
    return db
}

module.exports = {
    createUser,
    listUsers,

}