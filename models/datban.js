const {db, } = require('../pgp');

class DatCho{
    constructor(db){
        this.db = db
    }

    insertDatban(datban){
        return this.db.one('INSERT INTO datban(time_dat,date_dat,soluong,name_dat,so_dat,email_dat,ghichu)' +
            ' VALUES(${time}, ${date}, ${SoLuong},${Name_DatBan},${Number_DatBan},${Email_DatBan},${Ghi_Chu}) RETURNING *', datban)
    }

}


module.exports = new DatCho(db);