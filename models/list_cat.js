const {db,} = require('../pgp');

class cat {
    constructor(db){
        this.db = db
    }
    cat(){
        this.db.any(`﻿SELECT id_categories,name_categories,(array(
                        SELECT row_to_json(sub_category) FROM sub_category
                        WHERE categories.id_categories = sub_category.id_categories
                    )) 
                    FROM categories`
        )
    }

}

module.exports = new cat(db);