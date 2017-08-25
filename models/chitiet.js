const {db, } = require('../pgp');

class Chitiet {
    constructor (db) {
        this.db = db
    }

    detail (id) {
        return this.db.any("SELECT *,(array( " +
            "SELECT row_to_json(images) " +
            "FROM images WHERE location.id_location = images.id_location limit 12))" +
            "FROM location INNER JOIN districts ON districts.id_districts = location.id_districts " +
            "INNER JOIN city ON city.id_city = districts.id_city WHERE id_location = $1",[id])
    }
}


module.exports = new Chitiet(db);