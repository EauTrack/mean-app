'use strict';

var React = require('react');
require('node-jsx').install({extension: '.jsx'});
var safeStringify = require('../../utils/safeStringify');


module.exports = function (app) {

  function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }


  app.get('/profile', isLoggedIn, function (req, res) {
    var props = {
      user: req.user
    };
    var Profile = React.createFactory(require('../components/Profile'));
    var profileMarkup = React.renderToString(Profile(props));

    res.render('main', {
      body: profileMarkup,
      pageTitle: "Profile",
      props: safeStringify(props)
    });
  });

};



