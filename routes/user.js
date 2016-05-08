var authMW = require('../middleware/generic/auth');
var userListMW = require('../middleware/user/getUserList');
var deleteUserMW = require('../middleware/user/deleteUser');
var updateUserMW = require('../middleware/user/saveUser');
var renderMW = require('../middleware/generic/render');
var getUserDetails = require('../middleware/user/getUserById');
var ajaxRenderMW = require('../middleware/generic/ajaxRenderer');

var userModel = require("../models/user");

module.exports = function (app) {

    var objectRepository = {
        userModel: userModel
    };

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
        getUserDetails(objectRepository),
        deleteUserMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/users/list');
        }
    );

    /**
     * Store new user
     */
    app.use('/users/save',
        updateUserMW(objectRepository),
        userListMW(objectRepository),
        renderMW(objectRepository, 'userList')
    );


    /**
     * Ger user by Id
     */
    app.use('/ajax/user/:id',
        getUserDetails(objectRepository),
        ajaxRenderMW(objectRepository)
    );
};