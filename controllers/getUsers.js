require("dotenv").config();

const db = require('../db')

const getUsers = async (req,res) =>{
    const connection = await db.getConnection()
    const sqlGetUser = `select username from users`
    const users = await connection.query(sqlGetUser)
    if(users[0]){
        res.status(200).send(users[0])
    } else {
        res.send["No hay usuarios registrados"]
    }
console.log(users[0])
}

module.exports = {
    getUsers
}