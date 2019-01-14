const Controller = require('./Controller');
const MapDAO = require('../Model/MapDAO');

class Map extends Controller {

    constructor() {
        super();
    }

    Map(req, res, next) {
        let mapa = this.replaceBadChars(req.params.map)

        MapDAO.mapInfo('q').then(aa => {
            res.send('q')
        }).catch(err => {
            res.send('err')
        })
    }
}

module.exports = new Map;