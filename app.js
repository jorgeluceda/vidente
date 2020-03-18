// configure environment variables
const dotenv = require('dotenv');
dotenv.config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const logger = require('morgan');

const bodyParser = require('body-parser');
const passport = require('passport');
const favicon = require('serve-favicon');

// device type detection library
// var device = require('express-device');
// issue a connection to our MongoDB database
require('./app_api/models/db');
require('./app_api/config/passport');
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

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(bodyParser.raw());

// express session must be used before passport
app.use(session({
  secret: 'Insert Randomized text here',
  resave: false,
  saveUninitialized: false
}));

//include react static path
app.use('/app/', express.static(path.join(__dirname, './app_server/vidente-app/build/')));

//initialize passport before api routes but after static content
app.use(passport.initialize());

// defining the sets/subsets of URL's for which
// the routes will apply
app.use('/', indexRouter);
app.use('/api/', apiRouter);

// error handler for unauthorized errors
// first error handler since dont want other
// error handlers to intercept it first
app.use((err, req, res, next) => {
  if(err.name == 'UnauthorizedError') {
    res
      .status(401)
      .json({"message": err.name + ": " + err.message});
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler for pages
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
