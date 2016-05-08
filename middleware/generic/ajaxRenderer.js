/**
 * Rendering AJAX results
 */
module.exports = function (objectrepository) {

    return function (req, res) {
        res.end(JSON.stringify(res.tpl));
        //res.render(viewName, res.tpl);
    };

};