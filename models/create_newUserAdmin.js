const {db,} = require('../pgp');

class User{
    constructor(db){
        this.db = db
    }
    listUserAdmin(){
        return this.db.any('SELECT id,displayName,phone,email FROM useradmin ORDER BY id ASC')
    }
    checkUser(username){
        return this.db.any('SELECT useradmin.username from useradmin where username= $1',username)
    }
    insertNewUser(newuser) {
        return this.db.none('INSERT INTO useradmin(displayName,username,password,email,phone,avatar)' +
            'VALUES(${fullname},${username},${pass},${email},${phone},${avatar})', {
            fullname: newuser.fullname,
            username: newuser.name,
            pass: newuser.pass,
            email: newuser.email,
            avatar: newuser.avatar,
            phone: newuser.phone
        })
    }
    selectUser(id){
        return this.db.any('SELECT * FROM useradmin WHERE id = $1 ',id)
    }
    updateUser(obj){
        return this.db.none('UPDATE useradmin SET displayname=${fullname}, email=${email},phone=${phone},avatar=${avatar} WHERE id = ${id}',{
            id : obj.id,
            fullname : obj.fullname,
            email: obj.email,
            phone:obj.phone,
            avatar:obj.avatar
        })
    }
    deleteUser(id){
        return this.db.none('DELETE FROM useradmin WHERE id = $1',id)
    }
}

module.exports = new User(db)