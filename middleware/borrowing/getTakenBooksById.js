var requireOption = require('../common').requireOption;
/**
 * List of rented books
 */
module.exports = function (objectrepository) {

    var borrowModel = requireOption(objectrepository, 'borrowModel');
    var bookModel = requireOption(objectrepository, 'bookModel');
    var bookBorrowModel = requireOption(objectrepository, 'bookBorrowModel');

    return function (req, res, next) {
        bookBorrowModel.find({
            borrowId: req.params.id,
            isBack: "no"
        }).populate('bookId').exec(function(error,takenBook) {
            if(error){
                return res.redirect('/borrow/rentals');
            }
            res.tpl.takenBook = takenBook;
            return next();
        });
    };

};