const {db,} = require('../pgp');

class cat{
    constructor(db){
        this.db = db
    }
    Cat(){
        return this.db.any("SELECT id_categories,name_categories,(array( SELECT row_to_json(sub_category) FROM sub_category WHERE categories.id_categories = sub_category.id_categories )) FROM categories")
    }
    insert_cat(name){
        return this.db.any("INSERT INTO categories(name_categories) VALUES($1)",name)
    }
    insert_sub_cat(name,id){
        return this.db.any("INSERT INTO sub_category(name_castegory,id_categories) VALUES(${name},${id})",{
            name:name,
            id:id
        })
    }
}

module.exports = new cat(db);