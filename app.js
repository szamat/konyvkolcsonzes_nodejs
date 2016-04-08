var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap-datepicker/dist/css'));
app.use('/fonts', express.static(__dirname + '/node_modules/bootstrap/dist/fonts'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap-datepicker/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/knockout/build/output'));

require('./routes/ajax')(app);
require('./routes/books')(app);
require('./routes/borrowing')(app);
require('./routes/outside')(app);
require('./routes/user')(app);

var server = app.listen(3000, function () {
  console.log('Hello :3000');
});