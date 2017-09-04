const {db,} = require('../pgp');

class DatCho {
    constructor(db) {
        this.db = db
    }

    insertDatban(datban) {
        return this.db.one('INSERT INTO book(id_location,time,date,soluong,nguoidat,phone,note,email,name_location,status)' +
            ' VALUES(${id_location},${time}, ${date}, ${SoLuong},${Name_DatBan},${Number_DatBan},${Ghi_Chu},${Email_DatBan},${name_location},${status}) RETURNING *', datban)
    }
}


module.exports = new DatCho(db);