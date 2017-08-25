const {db, } = require('../pgp');

class trangchu{
    constructor(db){
        this.db = db
    }

    home_categories(){
            return this.db.any("SELECT * FROM categories")
        }
    home_category(){
        return this.db.any("SELECT * FROM sub_category")
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

// SELECT castegories.id_castegory,(array(
// SELECT row_to_json(location) FROM location
// JOIN castegories AS c1 ON c1.id_castegory = location.id_castegory
// WHERE location.id_castegory = castegories.id_castegory limit 3
// ))FROM castegories


// SELECT location.id_location ,(array(
// SELECT row_to_json(images) FROM images
// JOIN location AS c2 ON c2.id_location = images.id_location
// WHERE images.id_location = location.id_location
// ))FROM location where id_location = 'r1LjKV-O-'

module.exports = new trangchu(db);