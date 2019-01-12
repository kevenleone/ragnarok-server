const Model = require('./Model')

class Map extends Model {
    constructor(){
        super();
    }

    mapInfo(map){
        return this.query(`select md.iName, id, md.LV, md.HP, md.EXP, sum(quantity) total, spawntime from mob_place mp
        join mob_db md on mp.mobId = md.ID
        where map = '${map}'
        group by monster order by iName`);
    }
}

module.exports = new Map