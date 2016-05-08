var inverseAuthMW = require('../middleware/generic/inverseAuth');
var checkUserLoginMW = require('../middleware/user/checkUserLogin');
var mainRedirectMW = require('../middleware/generic/mainRedirect');
var renderMW = require('../middleware/generic/render');
var checkUserRegistrationMW = require('../middleware/user/saveUser');
var logoutMW = require('../middleware/generic/logout');

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
     * Logout -> main page
     */
    app.get('/logout',
        logoutMW(objectRepository),
        function(req, res, next){
            res.redirect('/');
        }
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