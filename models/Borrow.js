var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Borrow = db.borrow('Borrow', {
    name: String,
    contact: String,
    back: String
});

module.exports = Borrow;