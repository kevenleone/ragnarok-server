var globalMethods = require('../util/globalMethods')

module.exports = function(server){

    server.get('/map/:map', (req, res) => {
        var mapa = globalMethods.replaceBadChars(req.params.map)
        var connection = server.config.database()
        var MapDAO = new server.src.models.MapDAO(connection)

        MapDAO.mapInfo(mapa, (err, mapInfo) => {
            if(err){
                res.send(err)
                return ;
            }

            mapInfo.forEach(element => {
                element.spawntime = globalMethods.convertTimeSpawn(element.spawntime)
                element.iName = element.iName+` (${element.LV})`
            });

            res.send(mapInfo)
        })

    })
}