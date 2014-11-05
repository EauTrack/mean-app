'use strict';

var React = require('react');
require('node-jsx').install({extension: '.jsx'});
var Home = React.createFactory(require('../components/Home'));

module.exports = function (app) {
  var homeMarkup = React.renderToString(Home());

  app.get('/', function (req, res) {
    res.render('main', {
      body: homeMarkup,
      pageTitle: "Home"
    });
  });

};


