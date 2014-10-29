'use strict';

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var fs = require('fs');
var browserify = require('browserify-middleware');
var reactify = require('reactify');
var walk = require('./utils/walk');

var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

// Connect to the database.
mongoose.connect('localhost');

// Read in the model files
walk('./app/models', function (err, results) {
  results.forEach(function (file) {
    require(file);
  });
});


app.set('port', process.env.PORT || 3000);

app.engine('jsx', require('express-react-views').createEngine());
app.set('view engine', 'jsx');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'tv is cool' }));
app.use(passport.initialize());
app.use(passport.session());

app.set('views', __dirname + '/app/views');
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  if (req.user) {
    res.cookie('user', JSON.stringify(req.user));
  }
  next();
});


// Read in the routes
walk('./app/routes', function (err, results) {
  results.forEach(function(file) {
    require(file)(app);
  });
});

//fs.readdirSync("./routes").forEach(function(file) {
//  require("./routes/" + file)(app);
//});

browserify.settings({
  transform: [reactify],
  extensions: ['.js', '.jsx'],
  grep: /\.jsx?$/
});

//var shared = ['react'];
//app.use('/js',browserify('./views'));
//app.get('/js/bundle.js', browserify(['react']));
//app.get('/js/bundle.js', browserify('./views', {external: shared}));

//app.get('*', function(req, res) {
//  res.redirect('/#' + req.originalUrl);
//});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.send(500, { message: err.message });
});


app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

//var browserify = require('browserify');
//var literalify = require('literalify');
//var React = require('react');
//
//
//require('node-jsx').install({extension: '.jsx'});
//var LoginComponent = require('../components/Login');
//
//

//console.log(LoginComponent);
//
//http.createServer(function (req, res) {
//  if (req.url === '/') {
//    var props = { test: "test"};
//    var appHtml = React.renderComponentToString(LoginComponent(props));
//    res.setHeader('Content-Type', 'text/html');
//
//    var response = '<div id="content">' + appHtml + '</div>' +
//                   '<script src=//fb.me/react-0.12.0-rc1.min.js></script>' +
//                   '<script src=/bundle.js></script>' +
//      '<script>' +
//      'var MyApp = React.createFactory(require("./myApp.js"));' +
//      'React.render(MyApp(' + safeStringify(props) + '), document.getElementById("content"))' +
//      '</script>';
//
//    res.end(response);
//  }
//  else if (req.url === '/bundle.js') {
//    res.setHeader('Content-Type', 'text/javascript')
//    browserify()
//      .transform(literalify.configure({react: 'window.React'}))
//      .require('../components/Login.jsx')
//      .bundle()
//      .pipe(res);
//  } else {
//    res.statusCode = 404;
//    res.end();
//  }
//}).listen(3000);
//
//
//function safeStringify(obj) {
//  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
//}
