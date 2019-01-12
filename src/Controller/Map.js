const Controller = require('./Controller');
const MapDAO = require('../Model/MapDAO');

class Map extends Controller {

    constructor() {
        super();
    }

    Map(req, res, next) {
        let mapa = this.replaceBadChars(req.params.map)

        MapDAO.mapInfo(mapa).then(mapInfo => {

            mapInfo.forEach(element => {
                element.spawntime = this.convertTimeSpawn(element.spawntime)
                element.iName = `${element.iName} (${element.LV})`
            });

            this.sendSuccessResponse(req, res, next, mapInfo);
        }).catch(err => {
            this.sendErrorResponse(req, res, next, err);
        })
    }
}

module.exports = new Map;