const server = require('./config/config')

server.listen(3000, () => {
    console.log('Running in 3000')
})

server.get('/', (req,res) => {
    res.json({Greeting: 'Welcome to Ragnarok API'})
})
