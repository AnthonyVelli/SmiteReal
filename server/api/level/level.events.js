/**
 * Level model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Level = require('../../sqldb').Level;
var LevelEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
LevelEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Level.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    LevelEvents.emit(event + ':' + doc._id, doc);
    LevelEvents.emit(event, doc);
    done(null);
  };
}

exports.default = LevelEvents;
//# sourceMappingURL=level.events.js.map
