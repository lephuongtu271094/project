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
    getdetail(id){
        return this.db.any(`SELECT *,(array(
                                SELECT json_build_object(
                                    'name_cat',c.name_castegory,'id_cat',c.id_sub_category,
                                    'name_dis',d.name_districts,'id_dis',d.id_districts,
                                    'name_city',ci.name,'id_city',ci.id_city
                                ) FROM sub_category AS c,districts AS d,city AS ci
                                WHERE c.id_sub_category = loca.id_category
                                AND d.id_districts = loca.id_districts
                                AND	d.id_city = ci.id_city
                            )) FROM location AS loca
                            WHERE loca.id_location = $1`,id)
    }
    getCityDistrictsCategiry(id){
        let location = 'SELECT id_districts FROM location WHERE id_location = $1'
        let districts = 'SELECT id_city FROM districts WHERE id_districts = $1'
        let city = 'SELECT * FROM city'
        let cate = 'SELECT * FROM sub_category'
        let data = 'select *,(array( select row_to_json(districts) from districts where districts.id_city = city.id_city )) from city where city.id_city = $1'

        return db.task(t => {
            return t.one(location, id)
                .then(loca => {
                    return t.one(districts,loca.id_districts)
                        .then(dis => {
                            return t.batch([
                                t.any(data , dis.id_city),
                                t.any(city),
                                t.any(cate)
                            ])

                        })
                })
        }).then(data => {
            return{
            district : data[0],
                city : data[1],
                cate : data[2]
        }
        })
    }
    updateLocation(location){
        return this.db.none("UPDATE location SET " +
            "name_location = ${name}, address = ${address}, time_open = ${time_open}, rate = ${rate}, lat = ${lat}, long = ${long}, id_category = ${category}, id_districts = ${districts} WHERE id_location = ${id_location}",{
            districts : location.districts,
            category : location.category,
            address : location.address,
            name : location.name,
            rate : location.rate,
            lat : location.lat,
            long : location.long,
            time_open : location.time_open,
            id_location : location.id_location
        })
    }
    deleteLocation(id){
        let delImage = "DELETE FROM images WHERE id_location = $1";
        let delLocation = "DELETE FROM location WHERE id_location = $1"
        return db.task(t => {
            return t.none(delImage,id)
                .then(() => {
                    return t.none(delLocation,id)
                })
        })
    }
}

module.exports = new posts(db)