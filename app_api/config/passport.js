const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User')

// passport local strategy definition
passport.use(new LocalStrategy({
  usernameField: 'email'
  },
  (username, password, done) => {
    User.findOne({email: username}, (err, user) => {
      if(err) { return done(err); }
      if(!user) {
        return done(null, false, {
          message: 'Incorrect e-mail'
        });
      }
      if(!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password'
        });
      }
      return done(null, user);
    });
  }
));
