var inverseAuthMW = require('../middleware/generic/inverseAuth');
var checkUserLoginMW = require('../middleware/user/checkUserLogin');
var mainRedirectMW = require('../middleware/generic/mainRedirect');
var renderMW = require('../middleware/generic/render');
var checkUserRegistrationMW = require('../middleware/user/register');

var userModel = require('../models/user');

module.exports = function (app) {

    var objectRepository = {
        userModel: userModel
    };
    /**
     * Main page
     */
    app.get('/',
        mainRedirectMW(objectRepository)
    );

    /**
     * Login page
     */
    app.use('/login',
        inverseAuthMW(objectRepository),
        checkUserLoginMW(objectRepository),
        renderMW(objectRepository, 'login')
    );

    /**
     * Registration
     */
    app.use('/register',
        inverseAuthMW(objectRepository),
        checkUserRegistrationMW(objectRepository),
        renderMW(objectRepository, 'register')
    );

};