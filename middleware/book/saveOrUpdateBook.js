var requireOption = require('../common').requireOption;
/**
 * Modify book
 */
module.exports = function (objectrepository) {

    var bookModel = requireOption(objectrepository, 'bookModel');

//konyvCim  konyvSzerzo  kiadasEve  mufaj  ismerteto
    return function (req, res, next) {

        if ((typeof req.body.konyvCim === 'undefined' || req.body.konyvCim == '')
            || (typeof req.body.konyvSzerzo === 'undefined' || req.body.konyvSzerzo == '')
            || (typeof req.body.kiadasEve === 'undefined' || req.body.kiadasEve == '')
            || (typeof req.body.mufaj === 'undefined' || req.body.mufaj == '')
            || (typeof req.body.ismerteto === 'undefined' || req.body.ismerteto == '')
        ) {
            res.tpl.error.push("All fields are required!");
            return next();
        }

        if (typeof req.body.bookId !== 'undefined') {
            bookModel.findOne({
                _id: req.body.bookId
            }, function (err, result) {
                if(err){
                    console.log(err);
                }
                result.title = req.body.konyvCim;
                result.author = req.body.konyvSzerzo;
                result.published = req.body.kiadasEve;
                result.genre = req.body.mufaj;
                result.detail = req.body.ismerteto;

                // result.title = req.body.title;
                // result.description = req.body.description;

                result.save(function (err, result) {
                    if (err) {
                        return next(err);
                    }

                    return res.redirect('/books/list');
                });
            });
        } else {
            var book = new bookModel();
            book.title = req.body.konyvCim;
            book.author = req.body.konyvSzerzo;
            book.published = req.body.kiadasEve;
            book.genre = req.body.mufaj;
            book.detail = req.body.ismerteto;

            // result.title = req.body.title;
            // result.description = req.body.description;

            book.save(function (err, result) {
                if (err) {
                    return next(err);
                }

                return res.redirect('/books/new');
            });
        }
    };
}