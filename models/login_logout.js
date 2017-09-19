const {db,} = require('../pgp');

class login {
    constructor(db){
        this.db = db
    }
    UserLogin(name){
        return this.db.one('SELECT * FROM useradmin WHERE username = $1',[name])
    }

}

module.exports = new login(db)