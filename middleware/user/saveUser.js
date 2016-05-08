var requireOption = require('../common').requireOption;

/**
 * Check user registration
 */
module.exports = function (objectrepository) {

    var UserModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {

        //not enough parameter
        if ((typeof req.body === 'undefined') ||
            (typeof req.body.password === 'undefined')) {
            return next();
        }

        if (req.body.name.length < 3) {
            res.tpl.error.push('The username should be at least 3 characters!');
            return next();
        }
        if (typeof req.body.userId !== 'undefined') {
            UserModel.findOne({
                _id: req.body.userId
            }, function (err, result) {
                if(err){
                    console.log(err);
                    return next(new Error('InvalidId'));
                }
                result.name = req.body.name;
                result.password = req.body.password;

                result.save(function (err, result) {
                    if (err) {
                        return next(err);
                    }
                    return res.redirect('/users/list');

                });
            });
        } else {
            //create user
            var newUser = new UserModel();
            newUser.name = req.body.name;
            newUser.password = req.body.password;
            newUser.save(function (err) {
                //redirect to /login
                return res.redirect('/login');
            });
        }
    };
};