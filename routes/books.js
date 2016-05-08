var authMW = require('../middleware/generic/auth');
var bookListMW = require('../middleware/book/getBookList');
var deleteBookMW = require('../middleware/book/bookDeleteById');
var modifyBookMW = require('../middleware/book/saveOrUpdateBook');
var renderMW = require('../middleware/generic/render');
var bookDetailMW = require('../middleware/book/getBookById');
var ajaxRenderMW = require('../middleware/generic/ajaxRenderer');

var bookModel = require('../models/book');

module.exports = function (app) {

    var objectRepository = {
        bookModel : bookModel
    };

    app.use('/books',
        authMW(objectRepository)
    );

    /**
     * Books list
     */
    app.use('/books/list',
        bookListMW(objectRepository),
        renderMW(objectRepository, 'bookList')
    );

    /**
     * GetBookDetail
     */
    app.use('/ajax/book/:id',
        bookDetailMW(objectRepository),
        ajaxRenderMW(objectRepository)
    );

    /**
     * Delete a book
     */
    app.use('/books/:id/delete',
        bookDetailMW(objectRepository),
        deleteBookMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/books/list');
        }
    );

    /**
     * Modify book
     */
    app.use('/books/save',
        modifyBookMW(objectRepository)
    );

    /**
     * Display new book form
     */
    app.use('/books/new',
        modifyBookMW(objectRepository),
        renderMW(objectRepository, 'newBook')
    );
};