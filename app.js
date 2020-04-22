var path = require('path');
var config = require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./db');

var homeRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var galleryRouter = require('./routes/gallery');
var addUserRouter = require('./routes/addUser');
var usersRouter = require('./routes/users');
var userRouter = require('./routes/user');

var app = express();

// view engine setup
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'views/pages'), 
  path.join(__dirname, 'views/includes'), 
]);
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bulma', express.static(path.join(__dirname, 'node_modules/bulma/css')));

app.use('/', homeRouter);
app.use('/about', aboutRouter);
app.use('/gallery', galleryRouter);
app.use('/sign-up', addUserRouter);
app.use('/users', usersRouter);
app.use('/users/:id', userRouter);

// catch 404 and forward to error middleware
app.use(function(req, res, next) {
  next(createError(404));
});

// error middleware
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
