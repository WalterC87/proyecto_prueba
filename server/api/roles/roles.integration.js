'use strict';

var app = require('../..');
import request from 'supertest';

var newRoles;

describe('Roles API:', function() {

  describe('GET /api/roles', function() {
    var roless;

    beforeEach(function(done) {
      request(app)
        .get('/api/roles')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          roless = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      roless.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/roles', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/roles')
        .send({
          name: 'New Roles',
          info: 'This is the brand new roles!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newRoles = res.body;
          done();
        });
    });

    it('should respond with the newly created roles', function() {
      newRoles.name.should.equal('New Roles');
      newRoles.info.should.equal('This is the brand new roles!!!');
    });

  });

  describe('GET /api/roles/:id', function() {
    var roles;

    beforeEach(function(done) {
      request(app)
        .get('/api/roles/' + newRoles._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          roles = res.body;
          done();
        });
    });

    afterEach(function() {
      roles = {};
    });

    it('should respond with the requested roles', function() {
      roles.name.should.equal('New Roles');
      roles.info.should.equal('This is the brand new roles!!!');
    });

  });

  describe('PUT /api/roles/:id', function() {
    var updatedRoles;

    beforeEach(function(done) {
      request(app)
        .put('/api/roles/' + newRoles._id)
        .send({
          name: 'Updated Roles',
          info: 'This is the updated roles!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedRoles = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRoles = {};
    });

    it('should respond with the updated roles', function() {
      updatedRoles.name.should.equal('Updated Roles');
      updatedRoles.info.should.equal('This is the updated roles!!!');
    });

  });

  describe('DELETE /api/roles/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/roles/' + newRoles._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when roles does not exist', function(done) {
      request(app)
        .delete('/api/roles/' + newRoles._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
