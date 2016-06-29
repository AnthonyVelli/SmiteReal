'use strict';

var app = require('../..');
import request from 'supertest';

var newAbility;

describe('Ability API:', function() {

  describe('GET /api/abilities', function() {
    var abilitys;

    beforeEach(function(done) {
      request(app)
        .get('/api/abilities')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          abilitys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(abilitys).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/abilities', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/abilities')
        .send({
          name: 'New Ability',
          info: 'This is the brand new ability!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newAbility = res.body;
          done();
        });
    });

    it('should respond with the newly created ability', function() {
      expect(newAbility.name).to.equal('New Ability');
      expect(newAbility.info).to.equal('This is the brand new ability!!!');
    });

  });

  describe('GET /api/abilities/:id', function() {
    var ability;

    beforeEach(function(done) {
      request(app)
        .get('/api/abilities/' + newAbility._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          ability = res.body;
          done();
        });
    });

    afterEach(function() {
      ability = {};
    });

    it('should respond with the requested ability', function() {
      expect(ability.name).to.equal('New Ability');
      expect(ability.info).to.equal('This is the brand new ability!!!');
    });

  });

  describe('PUT /api/abilities/:id', function() {
    var updatedAbility;

    beforeEach(function(done) {
      request(app)
        .put('/api/abilities/' + newAbility._id)
        .send({
          name: 'Updated Ability',
          info: 'This is the updated ability!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedAbility = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAbility = {};
    });

    it('should respond with the updated ability', function() {
      expect(updatedAbility.name).to.equal('Updated Ability');
      expect(updatedAbility.info).to.equal('This is the updated ability!!!');
    });

  });

  describe('DELETE /api/abilities/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/abilities/' + newAbility._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when ability does not exist', function(done) {
      request(app)
        .delete('/api/abilities/' + newAbility._id)
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
