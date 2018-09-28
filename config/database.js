var mysql = require('mysql')
require('dotenv').config()
const env = process.env

var connMysql = function(){
    return mysql.createConnection({
        database: env.DB_NAME,
        port: 3306,
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASS
    })
}

module.exports = function(){
    return connMysql
}