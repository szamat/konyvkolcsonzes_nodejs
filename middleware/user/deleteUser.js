/**
 * Delete user
 */
module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof res.tpl.user === 'undefined') {
            return next();
        }

        res.tpl.user.remove(function (err) {
            if (err) {
                return next(err);
            }

            return res.redirect('/users/list')
        });
        return next();
    };

};