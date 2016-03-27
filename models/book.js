var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Book = db.book('Book', {
    title: String,
    author: String,
    published: number,
    genre: String,
    detail: String
});

module.exports = Book;