const jwt = require('jsonwebtoken')
const globalMethods = require('../util/globalMethods')

module.exports = function(server){

    server.post('/register', (req, res) => {
        var body = req.body;
        var connection = server.config.database();
        var UserDAO = new server.src.models.UserDAO(connection)

        var data = {
            user: globalMethods.replaceBadChars(body.user),
            password: globalMethods.replaceBadChars(body.password),
            email: globalMethods.replaceBadChars(body.email)
        }

        UserDAO.register(data, (err, result) => {
            if(err){
                res.send(err)
                return ;
            }

            res.send(`${data.user} registrado com sucesso!`)
        })
    })

    server.post('/auth', (req, res) => {
        var body = req.body;
        var connection = server.config.database();
        var UserDAO = new server.src.models.UserDAO(connection)

        var data = {
            user: globalMethods.replaceBadChars(body.user),
            password: globalMethods.replaceBadChars(body.password),
            email: globalMethods.replaceBadChars(body.email)
        }

        UserDAO.login(data, (err, result) => {
            if(err){
                res.send(err)
                return ;
            }

            if(result[0].total == 0){
                res.send('Não encontrado')
            } else {
                jwt.sign({user: data.user, email: data.email}, globalMethods.secretKey, (errT, token) => {

                    if(errT){
                        res.send(errT)
                        return ;
                    }
                    res.send({message: "Hello!!!", token: token})
                })
            }
        })


    })
}

