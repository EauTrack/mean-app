/**
 Utility file to wipe the DB after tests.
 Assumes a database connection already exists.
 **/

var mongoose = require('mongoose');
var config = require('../config');
var walk = require('../utils/walk');
var path = require('path');

module.exports = function (modelNameToWipe, callback) {

  var directory = path.resolve(config.rootDir, 'app/models/');

  // Read in the model files
  walk(directory, function (err, results) {
    results.forEach(function (file) {
      require(file);
    });
    var model = mongoose.connection.model(modelNameToWipe);
    model.remove().exec(callback(err));
  });




};


