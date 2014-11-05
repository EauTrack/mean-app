'use strict';

var passport = require('passport');
var User = require('mongoose').model('User');
var _ = require('lodash');


module.exports = function (app) {

  app.post('/api/login', passport.authenticate('local'), function (req, res) {
    res.cookie('user', JSON.stringify(req.user));
    res.send(req.user);
  });

  app.post('/api/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  app.get('/api/logout', function (req, res, next) {
    req.logout();
    res.sendStatus(200);
  });

};
