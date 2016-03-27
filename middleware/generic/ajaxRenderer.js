/**
 * Rendering AJAX results
 */
module.exports = function (objectrepository, viewName) {

    return function (req, res) {
        res.end('Render: ' + JSON.stringify(objectrepository.result));
        //res.render(viewName, res.tpl);
    };

};