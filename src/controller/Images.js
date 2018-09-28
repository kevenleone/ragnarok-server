var fs = require('fs')

module.exports = function(server){
    server.get('/image/:pst/:img', (req, res) => {
        var path = './images'
        var pst = req.params.pst
        var img = req.params.img

        if(pst == "animated"){
            img += ".gif"
        } else {
            img += ".png"
        }

        var file = `${path}/${pst}/${img}`
        
        fs.readFile(file, (err, content) => {
            if(err){
                res.send({err: 'Image not found, bro !'});
                return ;
            }
            res.writeHead(200, { 'content-type' : 'image/jpg'});
            res.end(content);
        })
    })
}
