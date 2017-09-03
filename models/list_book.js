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
}

module.exports = new book(db);