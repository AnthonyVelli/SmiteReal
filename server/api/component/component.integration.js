'use strict';

var app = require('../..');
import request from 'supertest';

var newComponent;

describe('Component API:', function() {

  describe('GET /api/components', function() {
    var components;

    beforeEach(function(done) {
      request(app)
        .get('/api/components')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          components = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(components).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/components', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/components')
        .send({
          name: 'New Component',
          info: 'This is the brand new component!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newComponent = res.body;
          done();
        });
    });

    it('should respond with the newly created component', function() {
      expect(newComponent.name).to.equal('New Component');
      expect(newComponent.info).to.equal('This is the brand new component!!!');
    });

  });

  describe('GET /api/components/:id', function() {
    var component;

    beforeEach(function(done) {
      request(app)
        .get('/api/components/' + newComponent._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          component = res.body;
          done();
        });
    });

    afterEach(function() {
      component = {};
    });

    it('should respond with the requested component', function() {
      expect(component.name).to.equal('New Component');
      expect(component.info).to.equal('This is the brand new component!!!');
    });

  });

  describe('PUT /api/components/:id', function() {
    var updatedComponent;

    beforeEach(function(done) {
      request(app)
        .put('/api/components/' + newComponent._id)
        .send({
          name: 'Updated Component',
          info: 'This is the updated component!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedComponent = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedComponent = {};
    });

    it('should respond with the updated component', function() {
      expect(updatedComponent.name).to.equal('Updated Component');
      expect(updatedComponent.info).to.equal('This is the updated component!!!');
    });

  });

  describe('DELETE /api/components/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/components/' + newComponent._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when component does not exist', function(done) {
      request(app)
        .delete('/api/components/' + newComponent._id)
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
