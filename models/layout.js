const {db, } = require('../pgp');

class Layout{
    constructor (db){
        this.db = db
    }

    City(){
        return this.db.any("SELECT * FROM city")
    }
    Name_city(city){
        return this.db.one("select name from city where id_city = $1",[city])
    }
    Districts(city){
        return this.db.any("select * from districts where id_city = $1",[city])
    }
}

module.exports = new Layout(db);