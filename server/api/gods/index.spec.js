'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var godsCtrlStub = {
  index: 'godsCtrl.index',
  show: 'godsCtrl.show',
  create: 'godsCtrl.create',
  update: 'godsCtrl.update',
  destroy: 'godsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var godsIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './gods.controller': godsCtrlStub
});

describe('Gods API Router:', function() {

  it('should return an express router instance', function() {
    expect(godsIndex).to.equal(routerStub);
  });

  describe('GET /api/gods', function() {

    it('should route to gods.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'godsCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/gods/:id', function() {

    it('should route to gods.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'godsCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/gods', function() {

    it('should route to gods.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'godsCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/gods/:id', function() {

    it('should route to gods.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'godsCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/gods/:id', function() {

    it('should route to gods.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'godsCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/gods/:id', function() {

    it('should route to gods.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'godsCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
