var authMW = require('../middleware/generic/auth');

var bookModel = require('../models/book');
var borrowModel = require('../models/borrow');
var bookBorrowModel = require('../models/bookBorrow');

module.exports = function (app) {

    var objectRepository = {
        bookModel: bookModel,
        borrowModel: borrowModel,
        bookBorrowModel: bookBorrowModel
    };

    app.use('/ajax',
        authMW(objectRepository)
    );
};