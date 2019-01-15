const Model = require('./Model')

class Map extends Model {
    constructor(){
        super();
    }

    mapInfo(map){
        return this.query(`select * from mob_place where map = '${map}'`)
    }
}

module.exports = new Map