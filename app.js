var config = require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var homeRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
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

// get_breadcrumbs generates breadcrumbs from each route
// get_breadcrumbs = function(url) {
//   // The root is HOME with url /
//   var rtn = [{name: "HOME", url: "/"}],
//   // An accumulator
//       acc = "", // accumulative url
//       arr = url.substring(1).split("/");

//   for (i=0; i<arr.length; i++) {
//       acc = i != arr.length-1 ? acc+"/"+arr[i] : null;
//       rtn[i+1] = {name: arr[i].toUpperCase(), url: acc};
//   }
//   return rtn;
// };

// app.use(function(req, res, next) {
//   req.breadcrumbs = get_breadcrumbs(req.originalUrl);
//   next();
// });

app.use('/', homeRouter);
app.use('/about', aboutRouter);
app.use('/sign-up', addUserRouter);
app.use('/users', usersRouter);
app.use('/users/:id', userRouter);

// catch 404 and forward to error middlewear
app.use(function(req, res, next) {
  next(createError(404));
});

// error middlewear
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
