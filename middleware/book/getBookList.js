/**
 * List the books
 */
module.exports = function (objectrepository) {
    var bookModel = requireOption(objectrepository, 'bookModel');
    return function (req, res, next) {
        return next();
    };

};