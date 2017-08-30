const {db,} = require('../pgp');

class List {
    constructor(db) {
        this.db = db
    }

    Location_city(city, limit, offset) {
        return this.db.any("SELECT * FROM location,districts,city,images " +
            "WHERE location.id_districts = districts.id_districts " +
            "AND images.id_location = location.id_location " +
            "AND show_img = 'true' " +
            "AND districts.id_city = city.id_city AND city.id_city = $1 " +
            "ORDER BY location.id DESC " +
            "LIMIT $2 OFFSET $3", [city, limit, offset])
    }

    Count_location_city(city) {
        return this.db.any("SELECT count(*) FROM location,districts,city,images " +
            "WHERE location.id_districts = districts.id_districts " +
            "AND images.id_location = location.id_location " +
            "AND show_img = 'true' " +
            "AND districts.id_city = city.id_city " +
            "AND city.id_city = $1", [city])
    }

    Location_districts(city, districts, limit, offset) {
        return this.db.any("SELECT * FROM location,districts,city,images " +
            "WHERE location.id_districts = districts.id_districts " +
            "AND images.id_location = location.id_location " +
            "AND show_img = 'true' " +
            "AND districts.id_city = city.id_city " +
            "AND city.id_city = ${city} " +
            "AND districts.id_districts = ${districts} " +
            "ORDER BY location.id DESC " +
            "LIMIT ${limit} OFFSET ${offset}"
            , {
                city: city,
                districts: districts,
                limit: limit,
                offset: offset
            })
    }

    Count_location_districts(city, districts) {
        return this.db.any("SELECT count(*) FROM location,districts,city,images " +
            "WHERE location.id_districts = districts.id_districts " +
            "AND images.id_location = location.id_location " +
            "AND show_img = 'true' " +
            "AND districts.id_city = city.id_city " +
            "AND city.id_city = $1 " +
            "AND districts.id_districts = $2", [city, districts])
    }

    Location_categories(cat, limit, offset) {
        return this.db.any("SELECT * FROM location,images,categories,sub_category " +
            "WHERE location.id_location = images.id_location " +
            "AND categories.id_categories = sub_category.id_categories " +
            "AND sub_category.id_sub_category = location.id_category " +
            "AND show_img = 'true' and categories.id_categories = ${cat} " +
            "AND show_img = 'true' " +
            "ORDER BY location.id DESC " +
            "LIMIT ${limit} OFFSET ${offset}"
            , {
                cat: cat,
                limit: limit,
                offset: offset
            })
    }

    Name_categories(cat) {
        return this.db.any("SELECT name_categories,id_categories FROM categories WHERE id_categories = $1", cat)
    }

    Count_location_categories(cat) {
        return this.db.any("SELECT count(*) FROM location,images,categories,sub_category " +
            "WHERE location.id_location = images.id_location " +
            "AND categories.id_categories = sub_category.id_categories " +
            "AND sub_category.id_sub_category = location.id_category " +
            "AND show_img = 'true' and categories.id_categories = $1 " +
            "AND show_img = 'true' ", cat)
    }

    Location_sub_category(sub_cat, limit, offset) {
        return this.db.any("SELECT * FROM location,sub_category,images " +
            "WHERE location.id_category = sub_category.id_sub_category " +
            "AND location.id_location = images.id_location " +
            "AND show_img = 'true' " +
            "AND sub_category.id_sub_category = ${sub_cat}" +
            "ORDER BY location.id DESC " +
            "LIMIT ${limit} OFFSET ${offset}"
            , {
                sub_cat: sub_cat,
                limit: limit,
                offset: offset
            })
    }

    Name_sub_category(sub_cat) {
        return this.db.any("SELECT name_castegory FROM sub_category WHERE id_sub_category = $1", sub_cat)
    }

    Count_location_sub_category(sub_cat) {
        return this.db.any("SELECT count(*) FROM location,sub_category,images " +
            "WHERE location.id_category = sub_category.id_sub_category " +
            "AND location.id_location = images.id_location " +
            "AND show_img = 'true' " +
            "AND sub_category.id_sub_category = $1", sub_cat)
    }

    Location_city_sub_category(city, cat, limit, offset) {
        return this.db.any("SELECT * FROM location,city,districts,sub_category,images " +
            "WHERE city.id_city = districts.id_city " +
            "AND location.id_districts = districts.id_districts " +
            "AND location.id_category = sub_category.id_sub_category " +
            "AND location.id_location = images.id_location AND images.show_img = 'true' " +
            "AND sub_category.id_sub_category = ${cat} " +
            "AND city.id_city = ${city} " +
            "ORDER BY location.id DESC " +
            "LIMIT ${limit} OFFSET ${offset}"
            , {
                city: city,
                cat: cat,
                limit: limit,
                offset: offset
            })
    }

    Count_location_city_sub_category(city, cat) {
        return this.db.any("SELECT count(*) FROM location,city,districts,sub_category,images " +
            "WHERE city.id_city = districts.id_city " +
            "AND location.id_districts = districts.id_districts " +
            "AND location.id_category = sub_category.id_sub_category " +
            "AND location.id_location = images.id_location AND images.show_img = 'true' " +
            "AND sub_category.id_sub_category = $2 " +
            "AND city.id_city = $1 ", [city, cat])
    }

    Location_city_districts_category(city, dis, cat, limit, offset) {
        return this.db.any("SELECT * FROM location,city,districts,sub_category,images " +
            "WHERE city.id_city = districts.id_city " +
            "AND location.id_districts = districts.id_districts " +
            "AND location.id_category = sub_category.id_sub_category " +
            "AND location.id_location = images.id_location " +
            "AND images.show_img = 'true' " +
            "AND districts.id_districts = ${dis} " +
            "AND sub_category.id_sub_category = ${cat} " +
            "AND city.id_city = ${city} " +
            "ORDER BY location.id DESC " +
            "LIMIT ${limit} OFFSET ${offset}"
            , {
                limit: limit,
                offset: offset,
                city: city,
                dis: dis,
                cat: cat
            })
    }

    Count_location_city_districts_category(city, dis, cat) {
        return this.db.any("SELECT count(*) FROM location,city,districts,sub_category,images " +
            "WHERE city.id_city = districts.id_city " +
            "AND location.id_districts = districts.id_districts " +
            "AND location.id_category = sub_category.id_sub_category " +
            "AND location.id_location = images.id_location " +
            "AND images.show_img = 'true' " +
            "AND districts.id_districts = ${dis} " +
            "AND sub_category.id_sub_category = ${cat} " +
            "AND city.id_city = ${city} "
            , {
                city: city,
                dis: dis,
                cat: cat
            })
    }
}

module.exports = new List(db);