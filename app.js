const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport')
const flash = require('connect-flash');
const nunjucks = require('nunjucks');
const expressValidator = require('express-validator');
const methodOverride = require('method-override')
const pagination = require('./models/custom_filter/pagination');

const index = require('./routes/index');
const admin = require('./routes/admin');

const app = express();


let env = nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true
});
env.addFilter('pagination', pagination);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images','logo2.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'))

app.use(session({
    secret: "secret",
    key: "LePhuongTu",
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(flash());
app.use(passport.session());


app.use(expressValidator({
    errorFormatter: (param, msg, value) => {
        let namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;
        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value:value
        }
    }
}))

app.use('/', index);
app.use('/admin', admin);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
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
