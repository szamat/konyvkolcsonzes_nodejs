/**
 * Taken book is back
 */
module.exports = function (objectrepository) {
    var borrowModel = requireOption(objectrepository, 'borrowModel');
    return function (req, res, next) {
        return next();
    };

};