var requireOption = require('../common').requireOption;
/**
 * Load all the users
 * and put them on res.tpl.users
 */
module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository,'userModel');

    return function (req, res, next) {
        userModel.find({}).exec(function(error,users) {
            if (error) {
                return next();
            }
            res.tpl.allUser = users;
            return next();
        });
    };

};