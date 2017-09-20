const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const mongoose     = require('mongoose');
const session      = require('express-session');
const passport     = require('passport');
const flash        = require('connect-flash');

//load environment variables from .env (top)
require("dotenv").config();

//run all setup code inside this file
require("./config/passport-config.js");

mongoose.connect(process.env.MONGODB_URI);

const app = express();


////////////////////////////////////

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// default value for title local
app.locals.title = 'Hurriscape';

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);

app.use(session(
  {
    secret: "blah blah banana jam mountain mist ocean",
    resave: true,
    saveUninitialized: true
  }
));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  if(req.user){
    res.locals.currentUser = req.user;
  } else{
    res.locals.currentUser = null;
  }
  next();
});

const index = require('./routes/index');
app.use('/', index);

//routes
const myAuthRoutes = require("./routes/auth-router.js");
app.use(myAuthRoutes);
const myOfferRoutes = require("./routes/offer-router.js");
app.use(myOfferRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
