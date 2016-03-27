var authMW = require('../middleware/generic/auth');
var bookListMW = require('../middleware/book/getBookList');
var deleteBookMW = require('../middleware/book/bookDeleteById');
var modifyBookMW = require('../middleware/book/saveOrUpdateBook');

module.exports = function (app) {

    var objectRepository = {};

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
     * Delete a book
     */
    app.use('/books/:id/delete',
        deleteBookMW(objectRepository),
        renderMW(objectRepository, 'bookList')
    );

    /**
     * Modify book
     */
    app.use('/books/:id/save',
        modifyBookMW(objectRepository),
        renderMW(objectRepository, 'bookList')
    );

    /**
     * Display new book form
     */
    app.use('/books/new',
        renderMW(objectRepository, 'bookList')
    );

    /**
     * Save new book
     */
    app.use('/books/save',
        modifyBookMW(objectRepository),
        renderMW(objectRepository,'newBook')
    );

};