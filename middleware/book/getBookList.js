var requireOption = require('../common').requireOption;
/**
 * List the books
 */
module.exports = function (objectrepository) {
    var bookModel = requireOption(objectrepository, 'bookModel');
    return function (req, res, next) {
        bookModel.find({}).exec(function(error,book) {
            if (error) {
                return next();
            }
            res.tpl.allBooks = book;
            return next();
        });
    };

};