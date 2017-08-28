const {db, } = require('../pgp');

class List {
    constructor (db){
        this.db = db
    }
    Location_city(city){
        return this.db.any("SELECT * FROM location,districts,city,images " +
            "WHERE location.id_districts = districts.id_districts " +
            "AND images.id_location = location.id_location " +
            "AND show_img = 'true' " +
            "AND districts.id_city = city.id_city " +
            "AND city.id_city = $1 " +
            "ORDER BY location.id DESC",[city])
    }
    Location_districts(city,districts){
        return this.db.any("SELECT * FROM location,districts,city,images " +
            "WHERE location.id_districts = districts.id_districts " +
            "AND images.id_location = location.id_location " +
            "AND show_img = 'true' " +
            "AND districts.id_city = city.id_city " +
            "AND city.id_city = ${city} " +
            "AND districts.id_districts = ${districts} " +
            "ORDER BY location.id DESC",{
            city:city,
            districts: districts
        })
    }
}

module.exports = new List(db);