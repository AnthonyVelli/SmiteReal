/**
 * Component model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Component = require('../../sqldb').Component;
var ComponentEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
ComponentEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Component.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    ComponentEvents.emit(event + ':' + doc._id, doc);
    ComponentEvents.emit(event, doc);
    done(null);
  };
}

exports.default = ComponentEvents;
//# sourceMappingURL=component.events.js.map
