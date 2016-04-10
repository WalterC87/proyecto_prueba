'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var rolesCtrlStub = {
  index: 'rolesCtrl.index',
  show: 'rolesCtrl.show',
  create: 'rolesCtrl.create',
  update: 'rolesCtrl.update',
  destroy: 'rolesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var rolesIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './roles.controller': rolesCtrlStub
});

describe('Roles API Router:', function() {

  it('should return an express router instance', function() {
    rolesIndex.should.equal(routerStub);
  });

  describe('GET /api/roles', function() {

    it('should route to roles.controller.index', function() {
      routerStub.get
        .withArgs('/', 'rolesCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/roles/:id', function() {

    it('should route to roles.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'rolesCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/roles', function() {

    it('should route to roles.controller.create', function() {
      routerStub.post
        .withArgs('/', 'rolesCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/roles/:id', function() {

    it('should route to roles.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'rolesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/roles/:id', function() {

    it('should route to roles.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'rolesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/roles/:id', function() {

    it('should route to roles.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'rolesCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
