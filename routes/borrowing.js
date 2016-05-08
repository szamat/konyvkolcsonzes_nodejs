var authMW = require('../middleware/generic/auth');
var renderMW = require('../middleware/generic/render');
var saveUpdateBorrowMW = require('../middleware/borrowing/saveOrUpdateBorrow');
var rentalListMW = require('../middleware/borrowing/getBorrowedList');

var bookModel = require('../models/book');
var borrowModel = require('../models/borrow');
var bookBorrowModel = require('../models/bookBorrow');

var getRenableBooksMW = require('../middleware/book/getRentableBooks');
var ajaxRenderMW = require('../middleware/generic/ajaxRenderer');
var getBorrowedListMW = require('../middleware/borrowing/getBorrowedList');
var getBorrowDetailMW = require('../middleware/borrowing/getBorrowById');
var getTakenBooksMW = require('../middleware/borrowing/getTakenBooksById');
var storeBackMW = require('../middleware/borrowing/storeBack');

module.exports = function (app) {

    var objectRepository = {
        bookModel: bookModel,
        borrowModel: borrowModel,
        bookBorrowModel: bookBorrowModel
    };

    app.use('/borrow',
        authMW(objectRepository)
    );

    /**
     * New borrow
     */
    app.use('/borrow/new',
        renderMW(objectRepository, 'newBorrow')
    );

    /**
     * Save borrow
     */
    app.use('/borrow/save',
        saveUpdateBorrowMW(objectRepository),
        ajaxRenderMW(objectRepository)
    );


    /**
     * List of rentals
     */
    app.use('/borrow/rentals',
        rentalListMW(objectRepository),
        renderMW(objectRepository, 'borrowedList')
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
    app.use('/ajax/borrow/:id',
        getBorrowDetailMW(objectRepository),
        getTakenBooksMW(objectRepository),
        ajaxRenderMW(objectRepository)
    );

    app.use('/borrow/back',
        storeBackMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/borrow/rentals');
        }
    )
};