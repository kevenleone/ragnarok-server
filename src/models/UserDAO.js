function UserDAO(connection){
    this._connection = connection
}

UserDAO.prototype.register = function(data, callback){
    this._connection.query('insert into users set ?', data, callback)
}

UserDAO.prototype.login = function(data, callback){
    this._connection.query(`select count(*) total from users where user = '${data.user}' and password = '${data.password}'`, callback)
}

module.exports = function(){
    return UserDAO;
}