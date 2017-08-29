const {db, } = require('../pgp');

class trangchu{
    constructor(db){
        this.db = db
    }
    home_location(){
        return this.db.any("SElECT * FROM sub_category,location,images " +
            "WHERE id_sub_category = location.id_category " +
            "AND location.id_location = images.id_location " +
            "AND show_location = true " +
            "AND show_img = true"
        )
    }
}

module.exports = new trangchu(db);