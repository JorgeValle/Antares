let express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
const passport = require('passport');

// the entry point for the database connection
require('./antares_core/models/entry-point.model');



// setting up the routes for the core admin section, core api, and user themes
const routesAntares = require('./antares_content/apps/routes/index');
const routesAPI = require('./antares_core/routes/retrieve.routes');
const routesTheme = require('./antares_content/themes/jorgevalle/routes/index');

var app = express();

// view directory setup, both for admin section and themes folder
app.set('views', [__dirname + '/antares_content/apps/views', __dirname + '/antares_content/themes/jorgevalle/views']);
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets')));
// use method override for allowing put and delete requests on forms
app.use(methodOverride('_method'));

//passport initialize
app.use(passport.initialize());


app.use('/api', routesAPI);
app.use('/', routesTheme);
app.use('/admin', routesAntares);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(3000, function () {
  console.log("Express has started on port 3000");
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
