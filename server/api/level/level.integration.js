'use strict';

var app = require('../..');
import request from 'supertest';

var newLevel;

describe('Level API:', function() {

  describe('GET /api/levels', function() {
    var levels;

    beforeEach(function(done) {
      request(app)
        .get('/api/levels')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          levels = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(levels).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/levels', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/levels')
        .send({
          name: 'New Level',
          info: 'This is the brand new level!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newLevel = res.body;
          done();
        });
    });

    it('should respond with the newly created level', function() {
      expect(newLevel.name).to.equal('New Level');
      expect(newLevel.info).to.equal('This is the brand new level!!!');
    });

  });

  describe('GET /api/levels/:id', function() {
    var level;

    beforeEach(function(done) {
      request(app)
        .get('/api/levels/' + newLevel._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          level = res.body;
          done();
        });
    });

    afterEach(function() {
      level = {};
    });

    it('should respond with the requested level', function() {
      expect(level.name).to.equal('New Level');
      expect(level.info).to.equal('This is the brand new level!!!');
    });

  });

  describe('PUT /api/levels/:id', function() {
    var updatedLevel;

    beforeEach(function(done) {
      request(app)
        .put('/api/levels/' + newLevel._id)
        .send({
          name: 'Updated Level',
          info: 'This is the updated level!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedLevel = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedLevel = {};
    });

    it('should respond with the updated level', function() {
      expect(updatedLevel.name).to.equal('Updated Level');
      expect(updatedLevel.info).to.equal('This is the updated level!!!');
    });

  });

  describe('DELETE /api/levels/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/levels/' + newLevel._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when level does not exist', function(done) {
      request(app)
        .delete('/api/levels/' + newLevel._id)
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
