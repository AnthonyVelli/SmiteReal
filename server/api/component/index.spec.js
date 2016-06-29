'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var componentCtrlStub = {
  index: 'componentCtrl.index',
  show: 'componentCtrl.show',
  create: 'componentCtrl.create',
  update: 'componentCtrl.update',
  destroy: 'componentCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var componentIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './component.controller': componentCtrlStub
});

describe('Component API Router:', function() {

  it('should return an express router instance', function() {
    expect(componentIndex).to.equal(routerStub);
  });

  describe('GET /api/components', function() {

    it('should route to component.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'componentCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/components/:id', function() {

    it('should route to component.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'componentCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/components', function() {

    it('should route to component.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'componentCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/components/:id', function() {

    it('should route to component.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'componentCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/components/:id', function() {

    it('should route to component.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'componentCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/components/:id', function() {

    it('should route to component.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'componentCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
