var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var compression = require('compression');
var logger = require('morgan');

var bodyParser = require('body-parser')
var favicon = require('serve-favicon');
// device type detection library
// var device = require('express-device');
// issue a connection to our MongoDB database
var db = require('./app_api/models/db');
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;

// routes for our frontend
const indexRouter = require('./app_server/routes/index');
// routes for our api
const apiRouter = require('./app_api/routes/index');

var app = express();

var session = require('express-session');


// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

// use gzip compression middleware before all
// other requests
app.use(compression());

// // captures device-type
// app.use(device.capture());
// device.enableDeviceHelpers(app);

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
  extended: true
}));

// express session must be used before passport
app.use(session({
  secret: 'Insert Randomized text here',
  resave: false,
  saveUninitialized: false
}));

//include react static path
app.use(express.static(path.join(__dirname, '../../../public/vidente-app/build/index.html')));

// defining the sets/subsets of URL's for which 
// the routes will apply
app.use('/', indexRouter);
app.use('/api/', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
