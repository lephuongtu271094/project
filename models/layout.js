const {db, } = require('../pgp');

class Layout{
    constructor (db){
        this.db = db
    }

    City(){
        return this.db.any("SELECT * FROM city")
    }
    Name_city(city){
        return this.db.one("SELECT name,id_city FROM city WHERE id_city = $1",[city])
    }
    Districts(city){
        return this.db.any("SELECT * FROM districts WHERE id_city = $1",[city])
    }
    Name_districts(dis){
        return this.db.any("SELECT name_districts,id_districts FROM districts WHERE id_districts = $1",[dis])
    }

}

module.exports = new Layout(db);