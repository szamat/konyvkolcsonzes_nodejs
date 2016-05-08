var express = require('express');
var app = express();

var session = require('express-session');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap-datepicker/dist/css'));
app.use('/fonts', express.static(__dirname + '/node_modules/bootstrap/dist/fonts'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap-datepicker/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/knockout/build/output'));

/**
 * Let's creat the .tpl and .error on the res object
 */
app.use(function (req, res, next) {
  res.tpl = {};
  res.tpl.error = [];

  return next();
});

/**
 * Parse parameters in POST
 */
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

/**
 * Session above all
 */
app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 600000
  },
  resave: true,
  saveUninitialized: false
}));

require('./routes/ajax')(app);
require('./routes/books')(app);
require('./routes/borrowing')(app);
require('./routes/outside')(app);
require('./routes/user')(app);



var server = app.listen(3000, function () {
  console.log('Hello :3000');
});