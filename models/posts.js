const {db, } = require('../pgp')

class posts {
    constructor(db) {
        this.db = db
    }

    getCity(){
        return this.db.any("SELECT * FROM city ORDER BY id_city ASC")
    }

    getSubCat(){
        return this.db.any("SELECT * FROM sub_category ORDER BY id_sub_category ASC")
    }
    getDistricts(city){
        return this.db.any("SELECT *,(array( Select row_to_json(districts) from districts where city.id_city = districts.id_city ))FROM city where city.id_city = $1",city)
    }
}

module.exports = new posts(db)