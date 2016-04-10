'use strict';

var app = require('../..');
import request from 'supertest';

var newGeneros;

describe('Generos API:', function() {

  describe('GET /api/generos', function() {
    var geneross;

    beforeEach(function(done) {
      request(app)
        .get('/api/generos')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          geneross = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      geneross.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/generos', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/generos')
        .send({
          name: 'New Generos',
          info: 'This is the brand new generos!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newGeneros = res.body;
          done();
        });
    });

    it('should respond with the newly created generos', function() {
      newGeneros.name.should.equal('New Generos');
      newGeneros.info.should.equal('This is the brand new generos!!!');
    });

  });

  describe('GET /api/generos/:id', function() {
    var generos;

    beforeEach(function(done) {
      request(app)
        .get('/api/generos/' + newGeneros._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          generos = res.body;
          done();
        });
    });

    afterEach(function() {
      generos = {};
    });

    it('should respond with the requested generos', function() {
      generos.name.should.equal('New Generos');
      generos.info.should.equal('This is the brand new generos!!!');
    });

  });

  describe('PUT /api/generos/:id', function() {
    var updatedGeneros;

    beforeEach(function(done) {
      request(app)
        .put('/api/generos/' + newGeneros._id)
        .send({
          name: 'Updated Generos',
          info: 'This is the updated generos!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedGeneros = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedGeneros = {};
    });

    it('should respond with the updated generos', function() {
      updatedGeneros.name.should.equal('Updated Generos');
      updatedGeneros.info.should.equal('This is the updated generos!!!');
    });

  });

  describe('DELETE /api/generos/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/generos/' + newGeneros._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when generos does not exist', function(done) {
      request(app)
        .delete('/api/generos/' + newGeneros._id)
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
