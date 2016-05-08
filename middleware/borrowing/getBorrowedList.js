var requireOption = require('../common').requireOption;
/**
 * List of rentals
 */
module.exports = function (objectrepository) {

    var borrowModel = requireOption(objectrepository, 'borrowModel');
    var bookModel = requireOption(objectrepository, 'bookModel');
    var bookBorrowModel = requireOption(objectrepository, 'bookBorrowModel');

    return function (req, res, next) {
        // borrowList
        borrowModel.find({
            allBack: 'no'
        }).exec(function(error,borrows) {
            if (error) {
                return next();
            }
            res.tpl.borrowList = borrows;

        return next();
        });
    };
};