const Model = require('./Model')

class Map extends Model {
    constructor(){
        super();
    }

    mapInfo(map){
        return this.query(`select * from mob_place`).then((value => {
            console.log(value)
        })).catch(err => {
            console.log(err)
        });
    }
}

module.exports = new Map