const {db,} = require('../pgp');

class Chitiet {
    constructor(db) {
        this.db = db
    }

    detail(id) {
        return this.db.any("SELECT * FROM location INNER JOIN districts ON districts.id_districts = location.id_districts INNER JOIN city ON city.id_city = districts.id_city INNER JOIN images ON images.id_location = location.id_location WHERE images.show_img = 'true' AND location.id_location = $1", [id])
    }

    detail_img(id) {
        return this.db.any("SELECT images.name_img FROM images WHERE id_location = $1 ORDER BY id_image DESC LIMIT 12", [id])
    }

    detail_correlate(cat) {
        return this.db.any("select * from location inner join images on images.id_location = location.id_location where show_location='false' and show_img = 'true' and id_category = $1 ORDER BY location.id DESC LIMIT 4", [cat])
    }
}


module.exports = new Chitiet(db);