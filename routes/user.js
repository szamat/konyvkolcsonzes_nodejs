var authMW = require('../middleware/generic/auth');
var userListMW = require('../middleware/user/getUserList');
var deleteUserMW = require('../middleware/user/deleteUser');
var updateUserMW = require('../middleware/user/updateUser');
var renderMW = require('../middleware/generic/render');

module.exports = function (app) {

    var objectRepository = {};

    app.use('/users',
        authMW(objectRepository)
    );

    /**
     * UserList
     */
    app.use('/users/list',
        userListMW(objectRepository),
        renderMW(objectRepository, 'userList')
    );

    /**
     * Delete user
     */
    app.use('/users/:id/delete',
        deleteUserMW(objectRepository),
        renderMW(objectRepository, 'userList')
    );

    /**
     * Modify user
     */
    app.use('/users/:id/save',
        updateUserMW(objectRepository),
        renderMW(objectRepository, 'userList')
    );

    /**
     * Store new user
     */
    app.use('/users/save',
        updateUserMW(objectRepository),
        renderMW(objectRepository, 'userList')
    );
};