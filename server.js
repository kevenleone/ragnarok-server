const server = require('./config/config')
var globalMethods = require('./src/util/globalMethods')

const PORT = process.env.PORT || 8000
server.listen(PORT, () => {
    console.log(`Running in ${PORT}`)
})

server.get('/', (req,res) => {
    res.json({Greeting: 'Welcome to Ragnarok API Prod', ENV: process.env.ENV})
})
