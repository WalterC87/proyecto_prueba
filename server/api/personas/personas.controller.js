/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/Usuarios              ->  index
 * POST    /api/Usuarios              ->  create
 * GET     /api/Usuarios/:id          ->  show
 * PUT     /api/Usuarios/:id          ->  update
 * DELETE  /api/Usuarios/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Usuarios} from '../../sqldb';
import {Generos} from '../../sqldb';
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

// Gets a list of Usuarioss
export function index(req, res) {
    return Usuarios.findAll({
        include: [

            {
                model: Generos

            },
            {
                model: Roles
            }
        ]
    })
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Usuarios from the DB
export function show(req, res) {
    return Usuarios.find({
        where: {
            idUsuario: req.params.id
        }
    })
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Usuarios in the DB
export function create(req, res) {
    return Usuarios.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));






}

// Updates an existing Usuarios in the DB
export function update(req, res) {
    if (req.body.idUsuario) {
        delete req.body.idUsuario;
    }
    return Usuarios.find({
        where: {
            idUsuario: req.params.id
        }
    })
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Usuarios from the DB
export function destroy(req, res) {
    return Usuarios.find({
        where: {
            idUsuario: req.params.id
        }
    })
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}
