import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as ejs from 'ejs';
import Database from './mg';
import ProductDatabase from './database/products';
import routes from './routes/index';
import users from './routes/users';
import usersAPI from './api/users';
import productsAPI from './api/products';
import ingredientsAPI from './api/ingredients';
import userTagsAPI from './api/usertags'; 
import * as passport from 'passport';
let LocalStrategy = require('passport-local').Strategy;
import User from './models/User';
let dotenv = require('dotenv');
import * as expjwt from 'express-jwt';
let jwtDecode = require('jwt-decode');
let app = express();

if (app.get('env') === "development") {
  dotenv.load();
}

//connect MongoDB through mongoose file
// Database.connect();
ProductDatabase.connect();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/ngApp', express.static(path.join(__dirname, 'ngApp')));
app.use('/api', express.static(path.join(__dirname, 'api')));
// app.use(expjwt({secret: "whatsinside"}).unless({path: ['/master/login']}));
app.use('/', routes);
// app.use('/users', users);
app.use('/api/users', usersAPI);
app.use('/api/products', productsAPI);
app.use('/api/ingredients', ingredientsAPI);
app.use('/api/usertags', userTagsAPI);
// redirect 404 to home for the sake of AngularJS client-side routes
app.get('/*', function(req, res, next) {
  if (/.js|.html|.css|templates|js|scripts/.test(req.path) || req.xhr) {
    return next({ status: 404, message: 'Not Found' });
  } else {
    return res.render('index');
  }
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err:Error, req, res, next) => {
    res.status(err['status'] || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err:Error, req, res, next) => {
  res.status(err['status'] || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

export = app;
