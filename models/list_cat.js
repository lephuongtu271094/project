const {db,} = require('../pgp');

class cat {
    constructor(db) {
        this.db = db
    }

    Cat() {
        return this.db.any("SELECT id_categories,name_categories,(array( SELECT row_to_json(sub_category) FROM sub_category WHERE categories.id_categories = sub_category.id_categories )) FROM categories")
    }

    insert_cat(name) {
        return this.db.any("INSERT INTO categories(name_categories) VALUES($1)", name)
    }

    insert_sub_cat(name, id) {
        return this.db.any("INSERT INTO sub_category(name_castegory,id_categories) VALUES(${name},${id})", {
            name: name,
            id: id
        })
    }

    categories(id) {
        return this.db.any("SELECT id_categories,name_categories FROM categories WHERE id_categories = $1", id)
    }

    sub_category(id) {
        return this.db.any("SELECT categories.name_categories,sub_category.* FROM categories,sub_category WHERE categories.id_categories = sub_category.id_categories AND sub_category.id_sub_category = $1", id)
    }

    update_categories(name, cats) {
        return this.db.any("UPDATE categories SET name_categories=${name} WHERE id_categories = ${cats}", {
            name: name,
            cats: cats
        })
    }

    update_sub_category(name, cats) {
        return this.db.any("UPDATE sub_category SET name_castegory =${name} WHERE id_sub_category = ${cats}", {
            name: name,
            cats: cats
        })
    }

    delete_categories(id) {
        let check_sub_cat = "SELECT * FROM categories inner join sub_category on categories.id_categories = sub_category.id_categories WHERE categories.id_categories = $1";
        let del = "DELETE FROM categories WHERE id_categories = $1";
        let del_sub = "DELETE FROM sub_category WHERE id_categories = $1";
        return db.task(t => {
            return t.any(check_sub_cat, id)
                .then(data => {
                    if (data.length > 0) {
                        return db.task(ta => {
                            return ta.none(del_sub, id)
                                .then(() => {
                                    return ta.none(del, id)
                                })
                        })
                    } else {
                        return t.none(del, id)
                    }
                }).catch(err => console.log(err))
        })
    }

    delete_sub_category(id) {
        return this.db.none("DELETE FROM sub_category WHERE id_sub_category = $1", id)
    }
}

module.exports = new cat(db);