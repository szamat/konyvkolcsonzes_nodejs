var requireOption = require('../common').requireOption;
/**
 * Get borrow detail
 */
module.exports = function (objectrepository) {

    var borrowModel = requireOption(objectrepository, 'borrowModel');
    var bookModel = requireOption(objectrepository, 'bookModel');
    var bookBorrowModel = requireOption(objectrepository, 'bookBorrowModel');

    return function (req, res, next) {
        borrowModel.findOne({
            _id: req.params.id
        }).exec(function(error,borrow) {
            if (error) {
                return res.redirect('/borrow/rentals');
            }
            res.tpl.borrow = borrow;
            return next();
        });
    };

};