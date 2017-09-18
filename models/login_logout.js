const {db,} = require('../pgp');

class log {
    constructor(db){
        this.db = db
    }

}

module.exports = new log(db)