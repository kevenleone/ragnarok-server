const Controller = require('./Controller');
const MonsterDAO = require('../Model/MonsterDAO');

class Monster extends Controller {

    constructor() {
        super();
    }

    geraJsonMonster(seq, id, item, slot, dropChance, mvp = false) {
        let data = {
            seq: seq,
            id: id,
            item: item,
            dropChance: dropChance,
            mvp: mvp
        }

        data.item = item !== null && slot !== null ? `${item} (${slot})` : item

        return data
    }

    Monsters(req, res, next) {
        let page = req.query.page || 0
        let start = page !== 0 ? page * 300 : 0;

        MonsterDAO.getMonster(start).then(monsterData => {
            monsterData.forEach(monster => {
                monster.avatar = `${this.URL}/img/animated/${monster.id}`;
                monster.background = this.getMonsterBackground(monster.race);
                monster.detail = `${this.URL}/monster/details/${monster.id}`;
            });
            this.sendSuccessResponse(req, res, next, {monsterData})

        }).catch(err => {
            this.sendErrorResponse(req, res, next, err);
        })
    }

    async MonsterDetail(req, res, next) {
        let drops = []
        let monsterId = this.replaceBadChars(req.params.id)

            try {
            let monsterHome = await MonsterDAO.getMonsterHome(monsterId);
            let monsterDrops = await MonsterDAO.getMonsterDrops(monsterId);
            let monsterSkill = await MonsterDAO.getMonsterSkill(monsterId);
            let monsterDetail = await MonsterDAO.getMonsterDetail(monsterId);

            if (monsterDetail.length > 0) {
                monsterDetail.forEach(detail => {
                    detail.avatar = `${this.URL}/img/animated/${detail.ID}`
                    detail.background = this.getMonsterBackground(detail.race)
                });

                monsterHome.forEach(home => {
                    home.spawn = this.convertTimeSpawn(home.spawntime)
                    home.mapTitle = "Calabouço de Prontera"
                });

                let Item1 = this.geraJsonMonster(1, monsterDrops[0].ID1, monsterDrops[0].Item1, monsterDrops[0].Slot1, monsterDrops[0].DropChance1)
                let Item2 = this.geraJsonMonster(2, monsterDrops[0].ID2, monsterDrops[0].Item2, monsterDrops[0].Slot2, monsterDrops[0].DropChance2)
                let Item3 = this.geraJsonMonster(3, monsterDrops[0].ID3, monsterDrops[0].Item3, monsterDrops[0].Slot3, monsterDrops[0].DropChance3)
                let Item4 = this.geraJsonMonster(4, monsterDrops[0].ID4, monsterDrops[0].Item4, monsterDrops[0].Slot4, monsterDrops[0].DropChance4)
                let Item5 = this.geraJsonMonster(5, monsterDrops[0].ID5, monsterDrops[0].Item5, monsterDrops[0].Slot5, monsterDrops[0].DropChance5)
                let Item6 = this.geraJsonMonster(6, monsterDrops[0].ID6, monsterDrops[0].Item6, monsterDrops[0].Slot6, monsterDrops[0].DropChance6)
                let Item7 = this.geraJsonMonster(7, monsterDrops[0].ID7, monsterDrops[0].Item7, monsterDrops[0].Slot7, monsterDrops[0].DropChance7)
                let Item8 = this.geraJsonMonster(8, monsterDrops[0].ID8, monsterDrops[0].Item8, monsterDrops[0].Slot8, monsterDrops[0].DropChance8)
                let Item9 = this.geraJsonMonster(9, monsterDrops[0].ID9, monsterDrops[0].Item9, monsterDrops[0].Slot9, monsterDrops[0].DropChance9)

                let ItemMVP1 = this.geraJsonMonster('MVP1', monsterDrops[0].MVPID1, monsterDrops[0].MVP1, monsterDrops[0].SlotMVP1, monsterDrops[0].DropChanceMvp1, true)
                let ItemMVP2 = this.geraJsonMonster('MVP2', monsterDrops[0].MVPID2, monsterDrops[0].MVP2, monsterDrops[0].SlotMVP2, monsterDrops[0].DropChanceMvp2, true)
                let ItemMVP3 = this.geraJsonMonster('MVP3', monsterDrops[0].MVPID3, monsterDrops[0].MVP3, monsterDrops[0].SlotMVP3, monsterDrops[0].DropChanceMvp3, true)

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

                let cardDrop = {
                    item: monsterDrops[0].Card,
                    id: monsterDrops[0].CardId
                }
                cardDrop = ((monsterDrops[0].CardId !== null) ? drops = drops.concat(cardDrop) : '');
            }

            this.sendSuccessResponse(req, res, next, {monsterDetail,monsterHome,monsterSkill,drops,})
        } catch (err){
            this.sendErrorResponse(req, res, next, err)
        }
    }
}

module.exports = new Monster