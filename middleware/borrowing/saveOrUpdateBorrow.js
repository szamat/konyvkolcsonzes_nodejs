var requireOption = require('../common').requireOption;
/**
 * Save a new borrow or save the take back
 */
module.exports = function (objectrepository) {

    var borrowModel = requireOption(objectrepository, 'borrowModel');
    var bookModel = requireOption(objectrepository, 'bookModel');
    var bookBorrowModel = requireOption(objectrepository, 'bookBorrowModel');

    return function (req, res, next) {
        if ((typeof req.body === 'undefined') ||
            (typeof req.body.kolcsonzoNeve === 'undefined') || req.body.kolcsonzoNeve == '' ||
            (typeof req.body.elerhetoseg === 'undefined') || req.body.elerhetoseg == '' ||
            (typeof req.body.visszaDatum === 'undefined') || req.body.visszaDatum == '' ||
            (typeof req.body.rentedBooks === 'undefined') ||req.body.rentedBooks == ''
        ) {
            res.tpl.error = 'Minden mező kitöltése kötelező!';
            return next();
        }

        //new borrow
        var newBorrow = new borrowModel();
        newBorrow.back = req.body.visszaDatum;
        newBorrow.contact = req.body.elerhetoseg;
        newBorrow.name = req.body.kolcsonzoNeve;
        newBorrow.allBack = "no";
        newBorrow.save(function (err) {
        });
        var rentBookArr = req.body.rentedBooks.split(',');
        for(var item in rentBookArr){
            var newBorrowBook = new bookBorrowModel();
            newBorrowBook.bookId = rentBookArr[item];
            newBorrowBook.borrowId = newBorrow._id;
            newBorrowBook.isBack = "no";
            newBorrowBook.save(function (err) {
            });
        };
        res.tpl = 'Stored';
        return next();
    };

};