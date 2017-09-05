const {db,} = require('../pgp');

class listadmin {
    constructor(db){
        this.db = db
    }

    listPost(){
       return this.db.any("SELECT * FROM location ORDER BY id DESC")
    }
    count_listPost(){
        return this.db.any("SELECT count(*) FROM location ORDER BY id DESC")
    }
    
}

module.exports = new listadmin(db);