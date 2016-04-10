'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var generosCtrlStub = {
  index: 'generosCtrl.index',
  show: 'generosCtrl.show',
  create: 'generosCtrl.create',
  update: 'generosCtrl.update',
  destroy: 'generosCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var generosIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './generos.controller': generosCtrlStub
});

describe('Generos API Router:', function() {

  it('should return an express router instance', function() {
    generosIndex.should.equal(routerStub);
  });

  describe('GET /api/generos', function() {

    it('should route to generos.controller.index', function() {
      routerStub.get
        .withArgs('/', 'generosCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/generos/:id', function() {

    it('should route to generos.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'generosCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/generos', function() {

    it('should route to generos.controller.create', function() {
      routerStub.post
        .withArgs('/', 'generosCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/generos/:id', function() {

    it('should route to generos.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'generosCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/generos/:id', function() {

    it('should route to generos.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'generosCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/generos/:id', function() {

    it('should route to generos.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'generosCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
