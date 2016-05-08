var requireOption = require('../common').requireOption;
/**
 * Get specified book
 */
module.exports = function (objectrepository) {

    var bookModel = requireOption(objectrepository, 'bookModel');

    return function (req, res, next) {
        bookModel.findOne({
            _id: req.params.id
        }).exec(function(error,book) {
            if(error){
                return res.redirect('/books/list');
            }
            res.tpl.book = book;
            return next();
        });
    };

};