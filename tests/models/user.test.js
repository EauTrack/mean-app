"use strict";

var config = require('../../config');
var mongoose = require('mongoose');
var expect = require('expect.js');
var User = require(config.rootDir + '/app/models/User');


describe('User Model', function () {

  var user;
  var user2;

  before(function () {
    var db = config.db('test');
    mongoose.connect(db);
  });

  beforeEach(function () {
    user = new User({
      username: 'McEnroe',
      email: 'john@test.com',
      password: 'AngryPlayer',
      name: {
        first: 'John',
        last: 'McEnroe'
      },
      provider: 'local'
    });

    user2 = new User({
      username: 'McEnroe',
      email: 'john@test.com',
      password: 'AngryPlayer',
      name: {
        first: 'John',
        last: 'McEnroe'
      },
      provider: 'local'
    });
  });

  afterEach(function () {
    User.remove().exec();
  });

  after(function () {
    mongoose.disconnect();
  });

  it('should save a normal model without issues', function (done) {
    user.save(function (err) {
      expect(err).to.be(null);
      done();
    });
  });

  it('should require a valid email address', function (done) {
    user.email = 'john';
    user.validate(function (err) {
      expect(err.errors.email.message).to.be('Please fill a valid email address');
      done();
    });
  });

  it('should require a password to be of length 6 or more', function (done) {
    user.password = '12345';
    user.validate(function (err) {
      expect(err.errors.password.message).to.be('Password should be longer');
      done();
    })
  });

  it('should require a first and last name', function (done) {
    user.name.first = '';
    user.name.last = '';
    user.validate(function (err) {
      expect(err.errors['name.first'].message).to.be('Please fill in your first name');
      expect(err.errors['name.last'].message).to.be('Please fill in your last name');
      done();
    })
  });

  it('should not allow a duplicate username', function (done) {
    user.save(function (err) {
      expect(err).to.be(null);
      user2.save(function (err2) {
        expect(err2.code).to.be(11000); // The duplicate key error code.
        done();
      });
    });
  });

  it('should not save without a provider', function (done) {
    user.provider = '';
    user.save(function (err) {
      expect(err.errors.provider.message).to.be('Provider is required');
      done();
    });
  });

  it('should authenticate a password', function (done) {
    user.save(function (err){
      expect(user.authenticate('AngryPlayer')).to.be(true);
      done();
    });
  });

  it('should reject an incorrect password', function (done) {
    user.save(function (err){
      expect(user.authenticate('HappyPlayer')).to.be(false);
      done();
    });
  });

  it('should suggest alternate usernames', function (done) {
    User.findUniqueUsername('McEnroe', 2, function (username) {
      expect(username).to.be('McEnroe2');
      done();
    });
  })


});
