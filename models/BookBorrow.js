var Schema = require('mongoose').Schema;
var db = require('../config/db');

var BookBorrow = db.model('BookBorrow', {
    borrowId: {
        type: Schema.Types.ObjectId,
        ref: 'Borrow'
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
    isBack: String,
    backDate: Number
});

module.exports = BookBorrow;