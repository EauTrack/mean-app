'use strict';

var passport = require('passport');
//var User = require('mongoose').model('User');

module.exports = function (app) {

  app.post('/api/login', passport.authenticate('local'), function(req, res) {
    res.cookie('user', JSON.stringify(req.user));
    res.send(req.user);
  });


  app.post('/api/signup', function(req, res, next) {
    var user = new User({
      email: req.body.email,
      password: req.body.password
    });
    user.save(function(err) {
      if (err) return next(err);
      res.send(200);
    });
  });


  app.get('/api/logout', function(req, res, next) {
    req.logout();
    res.send(200);
  });


};
