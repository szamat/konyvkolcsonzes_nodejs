var authMW = require('../middleware/generic/auth');
var renderMW = require('../middleware/generic/render');
var saveUpdateBorrowMW = require('../middleware/borrowing/saveOrUpdateBorrow');
var rentalListMW = require('../middleware/borrowing/getBorrowedList');


module.exports = function (app) {

    var objectRepository = {

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
        renderMW(objectRepository, 'newBorrow')
    );


    /**
     * List of rentals
     */
    app.use('/borrow/rentals',
        rentalListMW(objectRepository),
        renderMW(objectRepository, 'borrowedList')
    );

    /**
     * Store back date
     */
    app.use('/borrow/rentals/save',
        saveUpdateBorrowMW(objectRepository),
        renderMW(objectRepository, 'borrowedList')
    );
};