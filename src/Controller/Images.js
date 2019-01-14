const fs = require('fs')
const Controller = require('./Controller');

class Images extends Controller {

    constructor(){
        super();
    }

    Images(req, res, next) {
        let path = './images'
        let pst = req.params.pst
        let img = req.params.img
        img += pst === 'animated' ? '.gif' : '.png';
        let file = `${path}/${pst}/${img}`
        fs.readFile(file, (err, content) => {
            if (err) {
                this.sendErrorResponse(req, res, next, 'Image not found, bro')
            } else {
                this.sendImageResponse(req, res, next, content);
            }
        })
    }
}

module.exports =  new Images