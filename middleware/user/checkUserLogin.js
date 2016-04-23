var requireOption = require('../common').requireOption;

/**
 * This middleware loads the user from model and checks the credentials,
 * if they are ok, set session values and redirect to /
 * if they are wrong, set error message
 */
module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {

        //not enough parameter
        if ((typeof req.body === 'undefined') || (typeof req.body.inputName === 'undefined') ||
            (typeof req.body.inputPassword === 'undefined')) {
            return next();
        }

        //lets find the user
        userModel.findOne({
            name: req.body.inputName
        }, function (err, result) {
            if ((err) || (!result)) {
                res.tpl.error.push('Your user name is not registered!');
                return next();
            }

            //check password
            if (result.password !== req.body.inputPassword) {
                res.tpl.error.push('Wrong password!');
                return next();
            }

            //login is ok, save id to session
            req.session.userid = result._id;

            //redirect to / so the app can decide where to go next
            return res.redirect('/');
        });
    };
};