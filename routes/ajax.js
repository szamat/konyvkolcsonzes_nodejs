var authMW = require('../middleware/generic/auth');
var getRenableBooksMW = require('../middleware/book/getRentableBooks');
var ajaxRenderMW = require('../middleware/generic/ajaxRenderer');
var getBorrowedListMW = require('../middleware/borrowing/getBorrowedList');
var getBorrowDetailMW = require('../middleware/borrowing/getBorrowById');
var getTakenBooksMW = require('../middleware/borrowing/getTakenBooksById');
var storeBookBackMW = require('../middleware/borrowing/bookBack');
var bookDetailMW = require('../middleware/book/getBookById');
var getUserDetails = require('../middleware/user/getUserById');

module.exports = function (app) {

    var objectRepository = {

    };

    app.use('/ajax',
        authMW(objectRepository)
    );

    /**
     * Borrowable book list ajax
     */
    app.use('/ajax/getBorrowableBook',
        getRenableBooksMW(objectRepository),
        ajaxRenderMW(objectRepository)
    );

    /**
     * Borrowable book list ajax
     */
    app.use('/ajax/getBorroweList',
        getBorrowedListMW(objectRepository),
        ajaxRenderMW(objectRepository)
    );

    /**
     * Rental detail
     */
    app.use('ajax/borrow/:id',
        getBorrowDetailMW(objectRepository),
        getTakenBooksMW(objectRepository),
        ajaxRenderMW(objectRepository)
    );

    /**
     * Book back is ok
     */
    app.use('ajax/borrow/bookBack/:id',
        storeBookBackMW(objectRepository),
        ajaxRenderMW(objectRepository)
    );

    /**
     * GetBookDetail
      */
    app.use('ajax/book/:id',
        bookDetailMW(objectRepository),
        ajaxRenderMW(objectRepository)
    );

    /**
     * Ger user by Id
     */
    app.use('ajax/user/:id',
        getUserDetails(objectRepository),
        ajaxRenderMW(objectRepository)
    );

};