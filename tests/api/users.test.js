var expect = require('expect.js');
var request = require('supertest');
var mongoose = require('mongoose');
var config = require('../../config');
var wipeDB = require('../wipeDB');

describe('User API ', function () {
  var url = 'http://localhost:' + config.port;
  var createdUserOneId;
  var createdUserTwoId;

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

  before(function (done) {

    mongoose.connect(config.db('test'), function () {
        wipeDB('User', done);
    });

  });


  it('should create a user', function (done){
    request(url)
      .post('/api/users')
      .send(user)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        expect(res.status).to.be(200);
        expect(res.body.id).to.be.ok();
        createdUserOneId = res.body.id;
        done();
      });
  });

  it('should have an error on a duplicated username and give a suggestion', function (done) {
    request(url)
      .post('/api/users')
      .send(user)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        expect(res.status).to.be(400);
        expect(res.body.suggestions).to.be.ok();
        done();
      });
  });

  it('should get a list of all users', function (done) {
    user.username = 'user2';
    user.email = 'user2@place.com';
    request(url)
      .post('/api/users')
      .send(user)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        createdUserTwoId = res.body.id;
        request(url)
          .get('/api/users')
          .end(function (err2, res) {
            if (err2) {
              throw err2;
            }
            expect(res.status).to.be(200);
            expect(res.body.length).to.be(2);
            done();
          });
      });
  });

  it('should get a single user', function (done) {
    request(url)
      .post('/api/users')
      .send(user)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        createdUserTwoId = res.body.id;
        request(url)
          .get('/api/users/' + createdUserOneId)
          .end(function (err, res) {
            if (err) {
              throw err;
            }
            expect(res.status).to.be(200);
            expect(res.body.username).to.be('McEnroe');
            done();
          });
      });
  });

  it('should update a user', function (done) {
    user.name.first = "Roger";
    user.name.last = "Federer"
    request(url)
      .put('/api/users/' + createdUserOneId)
      .send(user)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        expect(res.status).to.be(200);
        expect(res.body.name.first).to.be('Roger');
        expect(res.body.name.last).to.be('Federer');
        expect(res.body._id).to.be(createdUserOneId);
        done();
      });
  });

  it('should delete a user', function (done) {
    request(url)
      .delete('/api/users/' + createdUserOneId)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        expect(res.status).to.be(204);
        request(url)
          .get('/api/users/' + createdUserOneId)
          .end(function (err, getResponse) {
            if (err) {
              throw err;
            }
            expect(getResponse.status).to.be(404);
            done();
          })
      });
  });



});
