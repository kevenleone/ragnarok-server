const server = require('./config/config')
var jwt = require('jsonwebtoken')
var globalMethods = require('./src/util/globalMethods')

const PORT = process.env.PORT || 6000
server.listen(PORT, () => {
    console.log(`Running in ${PORT}`)
})

server.get('/', (req,res) => {
    jwt.sign({nome: "Keven Leone dos Santos"} , globalMethods.secretKey, (err, token) => {
        res.json({Greeting: 'Welcome to Ragnarok API', token})
    })
})
