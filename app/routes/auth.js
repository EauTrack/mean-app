'use strict';

var React = require('react');
require('node-jsx').install({extension: '.jsx'});
var Signup = React.createFactory(require)('../components/Signup');

module.exports = function (app) {
  var signupMarkup = React.renderToString(Signup());

  app.get('/signup', function (req, res) {
    res.render('main', {
      body: signupMarkup,
      pageTitle: "Signup"
    });
  });

};


