const path = require('path');
const config = require('dotenv').config();
const createError = require('http-errors');
const logger = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const express = require('express');
const app = express();

const db = require('./db');
db.testConnection();

// view engine setup
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'views/pages'), 
  path.join(__dirname, 'views/includes'), 
]);
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bulma', express.static(path.join(__dirname, 'node_modules/bulma/css')));

//! Oops. Note to self, remember that routes need to be defined after bodyParser
const mainRoutes = require('./routes');
mainRoutes(app);

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
