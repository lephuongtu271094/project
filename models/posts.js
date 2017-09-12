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
    insertLocation(location,img,album){
        let inslocation =  'INSERT INTO location(address, lat, long, name_location, time_open, rate, id_location, id_districts, id_category, show_location)' +
                        'VALUES (${address},${lat},${long},${name},${time_open},${rate},${id_location},${districts},${category},${show_location})'
        let insimage = "INSERT INTO images(name_img, id_location,show_img) values (${img}, ${id_location},${show_img})"
        return db.task(t => {
            return t.none(inslocation,location)
                .then(() => {
                    return t.none(insimage,img)
                        .then(() => {
                            return t.batch(album.map(a=>{
                                return t.any(insimage, {
                                    img : a.img,
                                    id_location:a.id_location,
                                    show_img:a.show_img
                                });
                            }));
                        })
                })
        })
    }
}

module.exports = new posts(db)