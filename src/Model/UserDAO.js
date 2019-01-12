const Model = require('./Model')

class User extends Model {

    constructor(){
        super();
    }

    Register(data){
       return this.query('insert into users set ?', data)
    }
    
    Login(data){
        return this.query(`select count(*) total from users where user = '${data.user}' and password = '${data.password}'`);
    }
}

module.exports = new User;