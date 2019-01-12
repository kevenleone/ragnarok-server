const jwt = require('jsonwebtoken')
const Controller = require('./Controller')
const UserDAO = require('../Model/UserDAO')
const GlobalMethods = require('../Util/globalMethods')
class User extends Controller {

    constructor() {
        super();
    }

    Register(req, res, next) {
        let body = req.body;

        let data = {
            user: this.replaceBadChars(body.user),
            password: this.replaceBadChars(body.password),
            email: this.replaceBadChars(body.email)
        }

        UserDAO.Register(data).then(() => {
            this.sendSuccessResponse(req, res, next, `${data.user} registered with success`);
        }).catch(err => {
            this.sendErrorResponse(req, res, next, err)
        })

    }

    Auth(req, res, next) {
        let body = req.body;

        let data = {
            user: this.replaceBadChars(body.user),
            password: this.replaceBadChars(body.password),
            email: this.replaceBadChars(body.email)
        }

        UserDAO.Login(data).then(result => {
            if (result[0].total == 0) {
                res.send('Não encontrado')
            } else {
                jwt.sign({
                    user: data.user,
                    email: data.email
                }, globalMethods.secretKey, (errT, token) => {
                    this.sendSuccessResponse(req, res, next, {message: "Hi!",token})
                })
            }
        }).catch(err => {
            this.sendErrorResponse(req, res, next, err);
        })
    }
}

module.exports = new User;