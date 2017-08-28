const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');

// the entry point for the database connection
require('./antares_core/models/entry-point');

// setting up the routes for the core admin section, core api, and user themes
const routesAPI = require('./antares_core/routes/retrieve.routes');
const routesAntares = require('./antares_content/apps/antares_admin/routes/index');
const routesTheme = require('./antares_content/apps/jorge_valle/routes/index');

/**
 * declare the express app
 *
 *
 */
var app = express();

app.listen(3000, function () {
  console.log("Express has started on port 3000");
});

// view directory setup, both for antares admin app, and other user apps
app.set('views', [__dirname + '/antares_content/apps/antares_admin/views', __dirname + '/antares_content/apps/jorge_valle/views']);
app.set('view engine', 'pug');

// logging middleware
app.use(logger('dev'));

// parsing middleware for json and cookies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets')));

// use method override for allowing put and delete requests on forms
app.use(methodOverride('_method'));

//passport initialize
app.use(passport.initialize());

// setting up the routes for Antares, the Antares admin app, and the optional user app
app.use('/api', routesAPI);
app.use('/', routesTheme);
app.use('/admin', routesAntares);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

// finall we export the app module
module.exports = app;
