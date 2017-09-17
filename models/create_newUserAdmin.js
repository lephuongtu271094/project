const {db,} = require('../pgp');

class User{
    constructor(db){
        this.db = db
    }
    checkUser(username){
        return this.db.any('SELECT useradmin.username from useradmin where username= $1',username)
    }
    insertNewUser(newuser){
        return this.db.none('INSERT INTO useradmin(displayName,username,password,email,phone,avatar)' +
        'VALUES(${fullname},${username},${pass},${email},${phone},${avatar})',{
            fullname : newuser.fullname,
            username : newuser.name,
            pass : newuser.pass,
            email : newuser.email,
            avatar : newuser.avatar,
            phone : newuser.phone
        })
    }
    updateUser(){

    }
}

module.exports = new User(db)