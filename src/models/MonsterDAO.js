function MonsterDAO (connection){
    this._connection = connection;
}

MonsterDAO.prototype.getMonster = function(callback){
    var query = 'select id, iName, r.race from mob_db mb join race r on r.id_race = mb.Race group by iName limit 100' 
    this._connection.query(query, callback)
}

MonsterDAO.prototype.getMonsterDrops = function(MonsterId, callback){
    var query = `select 
    mob.iName as monster,
    card.name_japanese as Card, card.id as CardId,
    item1.id as ID1, item1.name_japanese as Item1, item1.slots as Slot1, mob.Drop1per as DropChance1,
    item2.id as ID2, item2.name_japanese as Item2, item2.slots as Slot2, mob.Drop2per as DropChance2,
    item3.id as ID3, item3.name_japanese as Item3, item3.slots as Slot3, mob.Drop3per as DropChance3,
    item4.id as ID4, item4.name_japanese as Item4, item4.slots as Slot4, mob.Drop4per as DropChance4,
    item5.id as ID5, item5.name_japanese as Item5, item5.slots as Slot5, mob.Drop5per as DropChance5,
    item6.id as ID6, item6.name_japanese as Item6, item6.slots as Slot6, mob.Drop6per as DropChance6,
    item7.id as ID7, item7.name_japanese as Item7, item7.slots as Slot7, mob.Drop7per as DropChance7,
    item8.id as ID8, item8.name_japanese as Item8, item8.slots as Slot8, mob.Drop8per as DropChance8,
    item9.id as ID9, item9.name_japanese as Item9, item9.slots as Slot9, mob.Drop9per as DropChance9,
    mvp1.id as MVPID1, mvp1.name_japanese as MVP1, mvp1.slots as SlotMVP1, mob.MVP1per as DropChanceMvp1,
    mvp2.id as MVPID2, mvp2.name_japanese as MVP2, mvp2.slots as SlotMVP2, mob.MVP2per as DropChanceMvp2,
    mvp3.id as MVPID3, mvp3.name_japanese as MVP3, mvp3.slots as SlotMVP3, mob.MVP3per as DropChanceMvp3
    from mob_db mob
    left join item_db item1 on item1.id = mob.Drop1id
    left join item_db item2 on item2.id = mob.Drop2id
    left join item_db item3 on item3.id = mob.Drop3id
    left join item_db item4 on item4.id = mob.Drop4id
    left join item_db item5 on item5.id = mob.Drop5id
    left join item_db item6 on item6.id = mob.Drop6id
    left join item_db item7 on item7.id = mob.Drop7id
    left join item_db item8 on item8.id = mob.Drop8id
    left join item_db item9 on item9.id = mob.Drop9id
    left join item_db mvp1 on mvp1.id = mob.MVP1id
    left join item_db mvp2 on mvp2.id = mob.MVP2id
    left join item_db mvp3 on mvp3.id = mob.MVP3id
    left join item_db card on card.id = mob.DropCardid
    where mob.id = ${MonsterId}`
    this._connection.query(query, callback)
}

MonsterDAO.prototype.getMonsterDetail = function(idMonster, callback){
    this._connection.query('select * from mob_db mb join race r on r.id_race = mb.Race where mb.id = '+idMonster, callback)
}

MonsterDAO.prototype.getMonsterSkill = function(idMonster, callback){
    var query = `select sd.SkillID, CONCAT(sd.Description, ' (',SKILL_LV,')') as skill from mob_skill_db msd 
    join skill_db sd on sd.SkillID = msd.SKILL_ID
    where MOB_ID = ${idMonster}
    group by sd.Description
    order by skill`
    this._connection.query(query, callback)
}

MonsterDAO.prototype.getMonsterHome = function(idMonster, callback){
    this._connection.query(`select map, spawntime, sum(quantity) total from mob_place 
    where mobId = ${idMonster} 
    group by map
    order by map`,callback)
}

module.exports = function(){
    return MonsterDAO
}