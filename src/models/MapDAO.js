function MapDAO (connection) {
    this._connection = connection
}

MapDAO.prototype.mapInfo = function(map, callback){
    this._connection.query(`select md.iName, id, md.LV, md.HP, md.EXP, sum(quantity) total, spawntime from mob_place mp
    join mob_db md on mp.mobId = md.ID
    where map = '${map}'
    group by monster order by iName`, callback)
}

module.exports = function(){
    return MapDAO
}