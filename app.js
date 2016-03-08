var express = require('express');
var app = express();

app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap-datepicker/dist/css'));
app.use('/fonts', express.static(__dirname + '/node_modules/bootstrap/dist/fonts'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap-datepicker/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/knockout/build/output'));

var server = app.listen(3000, function () {
  console.log('Hello :3000');
});