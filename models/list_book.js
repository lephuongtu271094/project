const {db,} = require('../pgp');

class book{
    constructor(db){
        this.db = db
    }

    BookList(){
        return this.db.any("SELECT * FROM book ORDER BY id_book DESC")
    }
    BookList_detail(book){
        return this.db.any("SELECT * FROM book,location WHERE book.id_location = location.id_location AND book.id_book = $1",book)
    }
    Update_status(id_book,status){
        return this.db.any("UPDATE book SET status=${stt} WHERE id_book = ${id}",{
            id: id_book,
            stt : status
        })
    }
}

module.exports = new book(db);