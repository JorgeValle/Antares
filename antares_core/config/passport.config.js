const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var User = mongoose.model('User');

/**
 * the local strategy
 *
 */
passport.use(new LocalStrategy({usernameField: 'email'}, function(username, password, done) {
  User.findOne({email: username}, function(err, user){
    if(err){
      return done(err);
    }
    if(!user){
      return done(null, false, {message: 'Incorrect User'});
    }
    if(!user.validatePassword(password)){
      return done(null, false, {message: 'Incorrect Password'});
    }
    return done(null, user);
  });
}));
