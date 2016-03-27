/**
 * Create or update the user
 */
module.exports = function (objectrepository) {
    var userModel = requireOption(objectrepository,'userModel');
    return function (req, res, next) {
        return next();
    };

};