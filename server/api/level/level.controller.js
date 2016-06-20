/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/levels              ->  index
 * POST    /api/levels              ->  create
 * GET     /api/levels/:id          ->  show
 * PUT     /api/levels/:id          ->  update
 * DELETE  /api/levels/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Level} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
    	console.log('bout to return gods');
    	console.log(entity.length);
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

// Gets a list of Levels
export function index(req, res) {
  return Level.findAll({where: {level: 20}})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Level from the DB
export function show(req, res) {
  return Level.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Level in the DB
export function create(req, res) {
  return Level.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Level in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Level.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Level from the DB
export function destroy(req, res) {
  return Level.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
