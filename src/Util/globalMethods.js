var ENV = process.env;
class globalMethods {

    constructor() {
        this.secretKey = "wingardiumleviosa123";
        this.URL = ENV.ENV !== "PROD" ? `${ENV.HOST}:${ENV.PORT}` : "https://ragnarokdb.herokuapp.com"
    }

    convertTimeSpawn (millisec) {
        var seconds = (millisec / 1000).toFixed(1);
        var minutes = (millisec / (1000 * 60)).toFixed(1);
        var hours = (millisec / (1000 * 60 * 60)).toFixed(1);
        var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

        if (seconds < 60) {
            if (seconds === '0.0') {
                return "Instantâneo"
            } else {
                return seconds + " Sec";
            }
        } else if (minutes < 60) {
            return minutes + " Min";
        } else if (hours < 24) {
            return hours + " Hrs";
        } else {
            return days + " Days"
        }
    }

    replaceBadChars (value) {
        return String(value).replace(/'/g, '');
    }

    verifyToken(req, res, next) {
        const bearerHeader = req.headers['authorization']
        if (typeof bearerHeader !== 'undefined') {
            var bearer = bearerHeader.split(' ');
            var bearerToken = bearer[1];
            req.token = bearerToken;
            next();
        } else {
            res.status(401).json({Error: "Access Denied"})
        }
    }

    getMonsterBackground(race){
        let background
    
        switch(race){
            case "Amorfo": {
                background = "#abb";
                break;
            }
    
            case "Morto-Vivo": {
                background = '#7159C1'
                break;
            }
    
            case "Bruto": {
                background = "#fab"
                break;
            }
    
            case "Planta": {
                background = "#9a9a"
                break;
            }
    
            case "Inseto": {
                background = "#afa"
                break;
            }
    
            case "Peixe": {
                background = "#008080"
                break;
            }
    
            case "Demônio": {
                background = "#D7BDE2"
                break;
            }
    
            case "Anjo": {
                background = "#E9F7EF"
                break;
            }
    
            case "Dragão": {
                background = "#5D6D7E"
                break;
            }
    
            case "Humanóide": {
                background = "#F6DDCC";
                break;
            }
    
            default: {
                background = '#abb'
                break;
            }
        }
        return background
    }

    Enviroment() {
        const argv = require('yargs').argv
        const argenv = argv.env

        if (argenv) {
            let path_env;
            if (argenv == "dev") {
                path_env = "./envs/.env.dev"
            } else if (argenv == "prod") {
                path_env = "./envs/.env.production"
            } else {
                path_env = "./envs/.env.local"
            }
            require('dotenv').config({path: path_env})
        } else {
            require('dotenv').config()
        }
    }
    
}

module.exports = globalMethods;