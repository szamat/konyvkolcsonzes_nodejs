var requireOption = require('../common').requireOption;
/**
 * Taken book is back
 */
module.exports = function (objectrepository) {

    var borrowModel = requireOption(objectrepository, 'borrowModel');
    var bookModel = requireOption(objectrepository, 'bookModel');
    var bookBorrowModel = requireOption(objectrepository, 'bookBorrowModel');

    return function (req, res, next) {
        if (typeof req.body === 'undefined') {
            res.tpl.error = 'Minden mező kitöltése kötelező!';
            return next();
        }
        borrowModel.findOne({
            _id: req.body.borrowId
        }).exec(function(err,item){
            if(err){
                    return next(new Error('Bad id given'));
            }
            item.allBack = 'yes';
            item.save(function (err, result) {
                if (err) {
                    return next(err);
                }
                bookBorrowModel.find({
                    borrowId: req.body.borrowId
                }).exec(function(error,bookBorrow) {
                    if (error) {
                        return next(new Error('Bad id given'));
                    }
                    bookBorrow.forEach(function(bookitem){
                        bookitem.isBack = "yes";
                        bookitem.save(function (err, result) {
                            if (err) {
                                return next(err);
                            }

                        });
                    })
                    return next();
                });
            });
        })

    };

};