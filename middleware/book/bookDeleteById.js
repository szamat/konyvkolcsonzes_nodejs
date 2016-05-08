/**
 * Delete specified book
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (typeof res.tpl.book === 'undefined') {
            return next();
        }

        res.tpl.book.remove(function (err) {
            if (err) {
                return next(err);
            }

            return res.redirect('/books/list')
        });
    };

};