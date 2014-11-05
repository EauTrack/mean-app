'use strict';

var React = require('react');
require('node-jsx').install({extension: '.jsx'});


module.exports = function (app) {


  app.get('/signup', function (req, res) {
    var Signup = React.createFactory(require)('../components/Signup');
    var signupMarkup = React.renderToString(Signup());

    res.render('main', {
      body: signupMarkup,
      pageTitle: "Signup",
      message: req.flash('signupMessage')
    });
  });

  app.get('/login', function (req, res) {
    var Login = React.createFactory(require)('../components/Login');
    var loginMarkup = React.renderToString(Login());

    res.render('main', {
      body: loginMarkup,
      pageTitle: "Login",
      message: req.flash('loginMessage')
    });
  });

  app.get('/logout', function (req, res) {
    req.logout();
    req.redirect('/');
  });



};


