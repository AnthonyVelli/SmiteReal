'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var abilityCtrlStub = {
  index: 'abilityCtrl.index',
  show: 'abilityCtrl.show',
  create: 'abilityCtrl.create',
  update: 'abilityCtrl.update',
  destroy: 'abilityCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var abilityIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './ability.controller': abilityCtrlStub
});

describe('Ability API Router:', function() {

  it('should return an express router instance', function() {
    expect(abilityIndex).to.equal(routerStub);
  });

  describe('GET /api/abilities', function() {

    it('should route to ability.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'abilityCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/abilities/:id', function() {

    it('should route to ability.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'abilityCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/abilities', function() {

    it('should route to ability.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'abilityCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/abilities/:id', function() {

    it('should route to ability.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'abilityCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/abilities/:id', function() {

    it('should route to ability.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'abilityCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/abilities/:id', function() {

    it('should route to ability.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'abilityCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
