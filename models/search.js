const {db,} = require('../pgp');

class Search{
    constructor(db){
        this.db = db
    }

    Search_location(index){
         return this.db.any("SELECT * FROM location,images " +
             "WHERE location.id_location = images.id_location " +
             "AND images.show_img = 'true' " +
             "AND location.name_location ILIKE $1",["%" + index + "%"])
    }
    Search_districts(index){
        return this.db.any("SELECT * FROM location,images,districts " +
            "WHERE location.id_location = images.id_location " +
            "AND images.show_img = 'true' " +
            "AND location.id_districts = districts.id_districts " +
            "AND districts.name_districts ILIKE $1",["%" + index + "%"])
    }
    Search_city(index){
        return this.db.any("SELECT * FROM location,images,districts,city " +
            "WHERE location.id_location = images.id_location " +
            "AND images.show_img = 'true' " +
            "AND location.id_districts = districts.id_districts " +
            "AND districts.id_city = city.id_city " +
            "AND city.name ILIKE $1",["%" + index + "%"])
    }
    Search_sub_category(index){
        return this.db.any("SELECT * FROM location,images,sub_category " +
            "WHERE location.id_location = images.id_location " +
            "AND images.show_img = 'true' " +
            "AND location.id_category = sub_category.id_sub_category " +
            "AND sub_category.name_castegory ILIKE $1",["%" + index + "%"])
    }
    Search_categories(index){
        return this.db.any("SELECT * FROM location,images,sub_category,categories " +
            "WHERE location.id_location = images.id_location " +
            "AND images.show_img = 'true' " +
            "AND location.id_category = sub_category.id_sub_category " +
            "AND sub_category.id_categories = categories.id_categories " +
            "AND categories.name_categories ILIKE $1",["%" + index + "%"])
    }

}

module.exports = new Search(db);