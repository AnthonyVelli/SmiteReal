/**
 * Gods model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var God = require('../../sqldb').Gods;
var GodEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
GodEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  God.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    GodEvents.emit(event + ':' + doc._id, doc);
    GodEvents.emit(event, doc);
    done(null);
  };
}

exports.default = GodEvents;
//# sourceMappingURL=gods.events.js.map
