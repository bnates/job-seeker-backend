'use strict';

const request = require('superagent');
const serverToggle = require('../lib/server-toggle.js');
const server = require('../server.js');
const PORT = process.env.PORT || 3000;

const User = require('../model/user.js');
const {exampleUser} = require('./lib/mock-data.js');

const url = `http://localhost:${PORT}`;
require('jest');

describe('User Auth Routes', function() {
  beforeAll( done => serverToggle.serverOn(server, done));
  afterAll( done => serverToggle.serverOff(server, done));

  describe('POST: /api/signup', function() {
    afterEach ( done => {
      User.remove({})
        .then( () => done())
        .catch(done);
    });
    it('should return a token with a valid body', done => {
      request.post(`${url}/api/signup`)
        .send(exampleUser)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(200);
          expect(typeof res.text).toEqual('string');
          done();
        });
    });
    it('should return a 400 error without a valid body', done => {
      request.post(`${url}/api/signup`)
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.text).toEqual('BadRequestError');
          done();
        });
    });
  });

  describe('GET: /api/signin', function() {
    beforeEach( done => {
      let user = new User(exampleUser);
      user.generatePasswordHash(exampleUser.password)
        .then( user => user.save())
        .then( user => {
          this.tempUser = user;
          done();
        })
        .catch(done);
    });
    afterEach( done => {
      User.remove({})
        .then( () => done())
        .catch(done);
    });
    it('should return a token with a valid body', done => {
      request.get(`${url}/api/signin`)
        .auth(exampleUser.username, exampleUser.password)
        .end( (err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(200);
          expect(typeof res.text).toEqual('string');
          done();
        });
    });
    it('should return a 401 error without a valid body', done => {
      request.get(`${url}/api/signin`)
        .end( (err, res) => {
          expect(res.status).toEqual(401);
          expect(res.text).toEqual('UnauthorizedError');
          done();
        });
    });
    it('should return a 400 error with an invalid username and password', done => {
      request.get(`${url}/api/signin`)
        .auth('fakeusername', 'fakepassword')
        .end( (err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
    
  });
});