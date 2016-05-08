var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Book = db.model('Book', {
    title: String,
    author: String,
    published: Number,
    genre: String,
    detail: String
});

module.exports = Book;