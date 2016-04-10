'use strict';

var app = require('../..');
import request from 'supertest';

var newPersonas;

describe('Personas API:', function() {

  describe('GET /api/personas', function() {
    var personass;

    beforeEach(function(done) {
      request(app)
        .get('/api/personas')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          personass = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      personass.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/personas', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/personas')
        .send({
          name: 'New Personas',
          info: 'This is the brand new personas!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPersonas = res.body;
          done();
        });
    });

    it('should respond with the newly created personas', function() {
      newPersonas.name.should.equal('New Personas');
      newPersonas.info.should.equal('This is the brand new personas!!!');
    });

  });

  describe('GET /api/personas/:id', function() {
    var personas;

    beforeEach(function(done) {
      request(app)
        .get('/api/personas/' + newPersonas._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          personas = res.body;
          done();
        });
    });

    afterEach(function() {
      personas = {};
    });

    it('should respond with the requested personas', function() {
      personas.name.should.equal('New Personas');
      personas.info.should.equal('This is the brand new personas!!!');
    });

  });

  describe('PUT /api/personas/:id', function() {
    var updatedPersonas;

    beforeEach(function(done) {
      request(app)
        .put('/api/personas/' + newPersonas._id)
        .send({
          name: 'Updated Personas',
          info: 'This is the updated personas!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPersonas = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPersonas = {};
    });

    it('should respond with the updated personas', function() {
      updatedPersonas.name.should.equal('Updated Personas');
      updatedPersonas.info.should.equal('This is the updated personas!!!');
    });

  });

  describe('DELETE /api/personas/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/personas/' + newPersonas._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when personas does not exist', function(done) {
      request(app)
        .delete('/api/personas/' + newPersonas._id)
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
