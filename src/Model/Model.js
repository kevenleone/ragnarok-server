const GlobalMethods = require('../Util/globalMethods')
const Global = new GlobalMethods

Global.Enviroment();

const ENV = process.env
const mysql = require('mysql')

class Model {

    constructor(){
        this.connection = mysql.createPool({
            host: ENV.DB_HOST,
            user: ENV.DB_USER,
            password: ENV.DB_PASSWORD,
            database: ENV.DB_DATABASE,
            port: ENV.DB_PORT,
        });
    }

    async query(sql, args = '') {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err){
                    return reject(err);
                }
                resolve(rows)
            });
        });

    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err){
                    return reject(err);
                }
                resolve();
            });
        });
    }
}

let nowModel = new Model


module.exports = Model