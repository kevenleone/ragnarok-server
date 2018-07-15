var mysql = require('mysql')

var connMysql = function(){
    return mysql.createConnection({
        database: 'ragnarok',
        host: 'localhost',
        user: 'root',
        password: ''
    })
}

module.exports = function(){
    return connMysql
}