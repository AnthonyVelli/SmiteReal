/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/gods              ->  index
 * POST    /api/gods              ->  create
 * GET     /api/gods/:id          ->  show
 * PUT     /api/gods/:id          ->  update
 * DELETE  /api/gods/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {God} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      console.log(entity.length);
      return res.status(statusCode).json(entity);
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
    console.log(err);
    res.status(statusCode).send(err);
  };
}
// Gets a list of Gods
export function index(req, res) {
  return God.findAll({attributes: ['name', 'type', 'class', 'pros', 'health', 'health_Growth_Rate', 'mana', 'mana_Growth_Rate', 'speed', 'speed_Growth_Rate', 'range', 'range_Growth_Rate', 'attack_Sec', 'attack_Sec_Growth_Rate', 'damage', 'damage_Growth_Rate', 'damage_Growth_Rate_2', 'progression', 'physical', 'physical_Growth_Rate', 'magical', 'magical_Growth_Rate', 'hp5', 'hp5_Growth_Rate', 'mp5', 'mp5_Growth_Rate', 'smallimg']})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single God from the DB
export function show(req, res) {
  return God.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Gods in the DB
export function create(req, res) {
  return God.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Gods in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return God.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Gods from the DB
export function destroy(req, res) {
  return God.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
