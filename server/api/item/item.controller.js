/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/items              ->  index
 * POST    /api/items              ->  create
 * GET     /api/items/:id          ->  show
 * PUT     /api/items/:id          ->  update
 * DELETE  /api/items/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.show = show;
exports.create = create;
exports.update = update;
exports.destroy = destroy;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _sqldb = require('../../sqldb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function (entity) {
    return entity.updateAttributes(updates).then(function (updated) {
      return updated;
    });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.destroy().then(function () {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    console.log(err);
    res.status(statusCode).send(err);
  };
}
// {attributes: ['name', 'image', 'class', 'description', 'pros']}
// Gets a list of Items
function index(req, res) {
  return _sqldb.Item.findAll({
    where: {
      class: 'item'
    },
    include: {
      model: _sqldb.Ability, include: [_sqldb.Component]
    }
  }).then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Item from the DB
function show(req, res) {
  return _sqldb.Item.find({
    where: {
      _id: req.params.id
    },
    include: {
      model: _sqldb.Ability, include: [_sqldb.Component]
    }
  }).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Item in the DB
function create(req, res) {
  return _sqldb.Item.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Updates an existing Item in the DB
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _sqldb.Item.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Item from the DB
function destroy(req, res) {
  return _sqldb.Item.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=item.controller.js.map
