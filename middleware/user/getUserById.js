/**
 * Load a user (if exists) with the :userid param
 * and put it on res.tpl.user
 */
module.exports = function (objectrepository) {
    var userModel = requireOption(objectrepository,'userModel');
    return function (req, res, next) {
        return next();
    };
};