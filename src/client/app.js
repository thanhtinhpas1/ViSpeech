var createError = require('http-errors');
var express = require('express');
var proxy = require('express-http-proxy');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
var cors = require('cors');
const global = require('./global');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'ui/build')));

const url = `${global.proxy.protocol}://${global.proxy.host}:${global.proxy.port}`;
app.use('/api', proxy(url, {
  proxyReqPathResolver: function (req) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {   // simulate async
        const path = `${global.proxy.basePath}${req.url}`;
        resolve(path);
      }, 200);
    });
  }
}));

app.use('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, 'ui/build/index.html'));
});

const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}
app.use(forceSSL());


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
