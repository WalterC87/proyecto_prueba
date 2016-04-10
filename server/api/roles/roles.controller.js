/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/roles              ->  index
 * POST    /api/roles              ->  create
 * GET     /api/roles/:id          ->  show
 * PUT     /api/roles/:id          ->  update
 * DELETE  /api/roles/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Roles} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Roless
export function index(req, res) {
  return Roles.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Roles from the DB
export function show(req, res) {
  return Roles.find({
    where: {
      idRol: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Roles in the DB
export function create(req, res) {
  return Roles.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Roles in the DB
export function update(req, res) {
  if (req.body.idRol) {
    delete req.body.idRol;
  }
  return Roles.find({
    where: {
      idRol: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Roles from the DB
export function destroy(req, res) {
  return Roles.find({
    where: {
      idRol: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
