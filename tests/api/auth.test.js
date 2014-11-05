var expect = require('expect.js');
var request = require('supertest');
var mongoose = require('mongoose');
var config = require('../../config');
var wipeDB = require('../wipeDB');

describe('Auth API ', function () {
  var url = 'http://localhost:' + config.port;

  var user = {
    username: 'McEnroe',
    email: 'john@test.com',
    password: 'AngryPlayer',
    name: {
      first: 'John',
      last: 'McEnroe'
    },
    provider: 'local'
  };

  var goodLogin = {
    username: 'McEnroe',
    password: 'AngryPlayer'
  };

  var badPassword = {
    username: 'McEnroe',
    password: 'HappyPlayer'
  };

  before(function (done) {
    mongoose.connect(config.db('test'), function () {
      wipeDB('User', done);
    });
  });

  beforeEach(function (done) {
    request(url)
      .post('/api/users')
      .send(user)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        done();
      });
  });

  afterEach(function (done) {
    wipeDB('User', done);
  });

  after(function () {
    mongoose.disconnect();
  });

  it('should log a user in', function (done) {
    request(url)
      .post('/api/login')
      .send(goodLogin)
      .end(function (err, res) {
        console.log(res.text);
        if (err) {
          throw err;
        }
        expect(res.status).to.be(200);
        expect(res.headers['set-cookie']).to.be.ok();
        done();
      });
  });

  it('should reject an improper user', function (done) {
    request(url)
      .post('/api/login')
      .send(badPassword)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        expect(res.status).to.be(401);
        done();
      });
  });

  it('should log a user out');

});
