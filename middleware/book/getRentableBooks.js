var requireOption = require('../common').requireOption;
/**
 * List the books which can be borrowed.
 */
module.exports = function (objectrepository) {
    
    var bookModel = requireOption(objectrepository, 'bookModel');

    return function (req, res, next) {
        bookModel.find({}).exec(function(error,book) {
            res.tpl = book;
            return next();
        });

    };

};