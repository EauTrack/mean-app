'use strict';

var User = require('mongoose').model('User');
var _ = require('lodash');


module.exports = function (app) {

  app.post('/api/users', function(req, res, next) {
    var user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      provider: req.body.provider
    });
    user.save(function(err, savedUser) {
      if (err) {
        // Duplicate data (assumed to be the username)
        if (err.name === 'MongoError' && err.code === 11000) {
          User.findUniqueUsername(req.body.username, 1, function (possibleUsername) {
            return res.status(400).send({
              error: 'Duplicate username',
              suggestions: [possibleUsername]
            });
          });
        } else {
          return next(err);
        }
      } else {
        return res.send({
          id: savedUser.id
        });
      }
    });
  });

  app.get('/api/users', function (req, res, next) {
    User.find({}, function (err, users) {
      if (err) { return next(err); }
      return res.send(users);
    });
  });

  app.get('/api/users/:id', function (req, res, next) {
    User.findById(req.param('id'), function (err, user) {
      if (err) { return next(err); }
      if (!user) return res.sendStatus(404);
      return res.send(user);
    });
  });

  app.put('/api/users/:id', function (req, res, next) {
    var updateObj = req.body;

    delete updateObj.roles;     // Don't allow, security
    delete updateObj._id;       // Don't allow, unique
    delete updateObj.username;  // Don't allow, unique

    updateObj.updated = Date.now();
    User.findByIdAndUpdate(req.params.id, {
      $set: updateObj
    }, function (err, updatedUser) {
        if (err) { return next(err); }
        return res.send(updatedUser);
    });
  });

  app.delete('/api/users/:id', function (req, res, next) {
    User.findByIdAndRemove(req.params.id, function (err, obj) {
      if (err) { return next(err); }
      return res.sendStatus(204);
    });
  });





};
