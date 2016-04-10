'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var personasCtrlStub = {
  index: 'personasCtrl.index',
  show: 'personasCtrl.show',
  create: 'personasCtrl.create',
  update: 'personasCtrl.update',
  destroy: 'personasCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var personasIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './personas.controller': personasCtrlStub
});

describe('Personas API Router:', function() {

  it('should return an express router instance', function() {
    personasIndex.should.equal(routerStub);
  });

  describe('GET /api/personas', function() {

    it('should route to personas.controller.index', function() {
      routerStub.get
        .withArgs('/', 'personasCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/personas/:id', function() {

    it('should route to personas.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'personasCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/personas', function() {

    it('should route to personas.controller.create', function() {
      routerStub.post
        .withArgs('/', 'personasCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/personas/:id', function() {

    it('should route to personas.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'personasCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/personas/:id', function() {

    it('should route to personas.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'personasCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/personas/:id', function() {

    it('should route to personas.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'personasCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
