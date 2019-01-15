const Controller = require('./Controller');
const MapDAO = require('../Model/MapDAO');

class Map extends Controller {

    constructor() {
        super();
    }

    Map(req, res, next) {
        let mapa = this.replaceBadChars(req.params.map)
        MapDAO.mapInfo(mapa).then(map => {
            this.sendSuccessResponse(req, res, next, map)
        }).catch(err => this.sendErrorResponse(req, res, next, err))
    }
}

module.exports = new Map;