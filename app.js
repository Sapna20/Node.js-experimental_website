var createError = require('http-errors');
var express = require('express');
var path = require('path');
//Cookies are simple, small files/data that are sent to client with a server request and stored 
//on the client side. Every time the user loads the website back, this cookie is sent with the request. 
//This helps us keep track of the user’s actions.
var cookieParser = require('cookie-parser');

//Morgan is another HTTP request logger middleware for Node.js. 
//It simplifies the process of logging requests to your application.
// You might think of Morgan as a helper that collects logs from your server, such as your request logs.
// It saves developers time because they don’t have to manually create common logs.
// It standardizes and automatically creates request logs
var logger = require('morgan');
var nodemailer = require("nodemailer");

var indexRouter = require('./routes/index');
var about = require('./routes/about')
var contact = require('./routes/contact');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//This process of simply returning files without modifying them is called serving static files. 
//We'll keep our static HTML, CSS and JavaScript files for our front-end in a public folder on our server, and Express will simply return those files as-is when the browser requests them.
//The following line of code in your project file will accomplish this
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about',about);
app.use('/contact', contact);

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
