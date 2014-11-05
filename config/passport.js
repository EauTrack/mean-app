
var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/User');


module.exports = function (passport) {

  passport.serializeUser(function (user, done ) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy(
    function (req, username, password, done) {
      process.nextTick(function () {
        User.findOne({username: username}, function (err, user) {
          if (err) { return done(err); }
          if (user) {
            return done(null, false, req.flash('signupMessage', 'Username is already taken'));
          } else {
            var user = new User();
            user.username = username;
            user.password = password;
            user.save(function (err) {
              if (err) { throw err; }
              return done(null, user);
            });
          }
        });
      });
    }
  ));

  //passport.use(new LocalStrategy(
  //  function (username, password, done) {
  //    User.findOne({username: username}, function (err, user) {
  //      if (err) { return done(err); }
  //      if (!user) {
  //        // Really an incorrect user, but we don't let them know which one for security.
  //        return done(null, false, {message: 'Incorrect Username or Password'});
  //      }
  //      if (!user.authenticate(password)) {
  //        // Really an incorrect password, but we don't let them know which one for security.
  //        return done(null, false, {message: 'Incorrect Username or Password'});
  //      }
  //      return done(null, user);
  //    });
  //  }
  //));

};
