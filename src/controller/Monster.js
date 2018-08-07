var monsterUtil = require('../util/backgroundMonster')
var globalMethods = require('../util/globalMethods')
var jwt = require('jsonwebtoken')
var fs = require('fs')
var tokenjwt = require('.././../config/tokenjwt')()

function geraJsonMonster(seq, id, item, slot, dropChance, mvp = false){
    let retorno = null
    
    if(item !== null){
        if(slot !== null){
            item = item + ' ('+slot+')'
        }

        retorno = {
            seq: seq,
            id: id,
            item: item,
            dropChance: dropChance,
            mvp: mvp
        }
    }

    return retorno
}

module.exports = function(server){
    server.get('/monster', (req, res) => {
            var page = req.query.page || 0
            var connection = server.config.database()
            var MonsterDAO = new server.src.models.MonsterDAO(connection)
            var start = 0

            if(page !== 0){
                start = page*300
            } else {
                start = 0;
            }

            console.log(page)
            MonsterDAO.getMonster(start,(err, monster) => {
                if(err){
                    res.json({err})
                    return ;
                }

                monster.forEach(mob => {
                    mob.avatar = `http://file5.ratemyserver.net/mobs/${mob.id}.gif`
                    mob.background = monsterUtil.getMonsterBackground(mob.race)
                });
                res.status(200).json(monster)
            })
            connection.end()
    })

    server.get('/monster/details/:id', (req, res) => {
        var drops = []
        var monsterId = globalMethods.replaceBadChars(req.params.id)
        var connection = server.config.database()
        var MonsterDAO = new server.src.models.MonsterDAO(connection)

        MonsterDAO.getMonsterDrops(monsterId, (errDrops, monsterDrops) => {
            MonsterDAO.getMonsterDetail(monsterId, (errDetail, monsterDetail) => {
                MonsterDAO.getMonsterSkill(monsterId, (errSkill, monsterSkill) => {
                    MonsterDAO.getMonsterHome(monsterId, (errHome, monsterHome) => {

                        if(errDrops || errDetail || errSkill || errHome){
                            res.send({errDrops, errDetail, errSkill, errHome})
                            return ;
                        }

                        if(monsterDetail.length > 0){
                            monsterDetail.forEach(mob => {
                                mob.avatar = `http://file5.ratemyserver.net/mobs/${mob.id}.gif`
                                mob.background = monsterUtil.getMonsterBackground(mob.race)
                            });

                            monsterHome.forEach(element => {
                                element.spawn = globalMethods.convertTimeSpawn(element.spawntime)
                                element.mapTitle = "Calabouço de Prontera"
                            });

                            let Item1 = geraJsonMonster(1,monsterDrops[0].ID1,monsterDrops[0].Item1,monsterDrops[0].Slot1,monsterDrops[0].DropChance1)
                            let Item2 = geraJsonMonster(2,monsterDrops[0].ID2,monsterDrops[0].Item2,monsterDrops[0].Slot2,monsterDrops[0].DropChance2)
                            let Item3 = geraJsonMonster(3,monsterDrops[0].ID3,monsterDrops[0].Item3,monsterDrops[0].Slot3,monsterDrops[0].DropChance3)
                            let Item4 = geraJsonMonster(4,monsterDrops[0].ID4,monsterDrops[0].Item4,monsterDrops[0].Slot4,monsterDrops[0].DropChance4)
                            let Item5 = geraJsonMonster(5,monsterDrops[0].ID5,monsterDrops[0].Item5,monsterDrops[0].Slot5,monsterDrops[0].DropChance5)
                            let Item6 = geraJsonMonster(6,monsterDrops[0].ID6,monsterDrops[0].Item6,monsterDrops[0].Slot6,monsterDrops[0].DropChance6)
                            let Item7 = geraJsonMonster(7,monsterDrops[0].ID7,monsterDrops[0].Item7,monsterDrops[0].Slot7,monsterDrops[0].DropChance7)
                            let Item8 = geraJsonMonster(8,monsterDrops[0].ID8,monsterDrops[0].Item8,monsterDrops[0].Slot8,monsterDrops[0].DropChance8)
                            let Item9 = geraJsonMonster(9,monsterDrops[0].ID9,monsterDrops[0].Item9,monsterDrops[0].Slot9,monsterDrops[0].DropChance9)

                            let ItemMVP1 = geraJsonMonster('MVP1',monsterDrops[0].MVPID1,monsterDrops[0].MVP1,monsterDrops[0].SlotMVP1,monsterDrops[0].DropChanceMvp1, true)
                            let ItemMVP2 = geraJsonMonster('MVP2',monsterDrops[0].MVPID2,monsterDrops[0].MVP2,monsterDrops[0].SlotMVP2,monsterDrops[0].DropChanceMvp2, true)
                            let ItemMVP3 = geraJsonMonster('MVP3',monsterDrops[0].MVPID3,monsterDrops[0].MVP3,monsterDrops[0].SlotMVP3,monsterDrops[0].DropChanceMvp3, true)

                            Item1 = ((Item1 !== null) ? drops = drops.concat(Item1) : '');
                            Item2 = ((Item2 !== null) ? drops = drops.concat(Item2) : '');
                            Item3 = ((Item3 !== null) ? drops = drops.concat(Item3) : '');
                            Item4 = ((Item4 !== null) ? drops = drops.concat(Item4) : '');
                            Item5 = ((Item5 !== null) ? drops = drops.concat(Item5) : '');
                            Item6 = ((Item6 !== null) ? drops = drops.concat(Item6) : '');
                            Item7 = ((Item7 !== null) ? drops = drops.concat(Item7) : '');
                            Item8 = ((Item8 !== null) ? drops = drops.concat(Item8) : '');
                            Item9 = ((Item9 !== null) ? drops = drops.concat(Item9) : '');

                            ItemMVP1 = ((ItemMVP1 !== null) ? drops = drops.concat(ItemMVP1) : '');
                            ItemMVP2 = ((ItemMVP2 !== null) ? drops = drops.concat(ItemMVP2) : '');
                            ItemMVP3 = ((ItemMVP3 !== null) ? drops = drops.concat(ItemMVP3) : '');

                            var cardDrop = {
                                item: monsterDrops[0].Card,
                                id: monsterDrops[0].CardId
                            }

                            cardDrop = ((monsterDrops[0].CardId !== null) ? drops = drops.concat(cardDrop) : '');
                        }

                        res.json({monsterDetail, monsterHome, drops, monsterSkill})
                        connection.end()
                        })
                    })
                })
            })
        })


    server.get('/avatar/:pst/:img', (req, res) => {
        var path = './images'
        var pst = req.params.pst
        var img = req.params.img
    
        var file = `${path}/${pst}/${img}`
        
        fs.readFile(file, (err, content) => {
            if(err){
                res.send(err);
                return ;
            }
            res.writeHead(200, { 'content-type' : 'image/jpg'});
            res.end(content);
        })
    })

}
