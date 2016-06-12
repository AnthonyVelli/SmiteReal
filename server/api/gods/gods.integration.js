'use strict';

var app = require('../..');
import request from 'supertest';

var newGods;

describe('Gods API:', function() {

  describe('GET /api/gods', function() {
    var gods;

    beforeEach(function(done) {
      request(app)
        .get('/api/gods')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          gods = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(gods).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/gods', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/gods')
        .send({
          name: 'New Gods',
          info: 'This is the brand new gods!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newGods = res.body;
          done();
        });
    });

    it('should respond with the newly created gods', function() {
      expect(newGods.name).to.equal('New Gods');
      expect(newGods.info).to.equal('This is the brand new gods!!!');
    });

  });

  describe('GET /api/gods/:id', function() {
    var gods;

    beforeEach(function(done) {
      request(app)
        .get('/api/gods/' + newGods._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          gods = res.body;
          done();
        });
    });

    afterEach(function() {
      gods = {};
    });

    it('should respond with the requested gods', function() {
      expect(gods.name).to.equal('New Gods');
      expect(gods.info).to.equal('This is the brand new gods!!!');
    });

  });

  describe('PUT /api/gods/:id', function() {
    var updatedGods;

    beforeEach(function(done) {
      request(app)
        .put('/api/gods/' + newGods._id)
        .send({
          name: 'Updated Gods',
          info: 'This is the updated gods!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedGods = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedGods = {};
    });

    it('should respond with the updated gods', function() {
      expect(updatedGods.name).to.equal('Updated Gods');
      expect(updatedGods.info).to.equal('This is the updated gods!!!');
    });

  });

  describe('DELETE /api/gods/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/gods/' + newGods._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when gods does not exist', function(done) {
      request(app)
        .delete('/api/gods/' + newGods._id)
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
