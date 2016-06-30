/**
 * Ability model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Ability = require('../../sqldb').Ability;
var AbilityEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
AbilityEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Ability.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    AbilityEvents.emit(event + ':' + doc._id, doc);
    AbilityEvents.emit(event, doc);
    done(null);
  };
}

exports.default = AbilityEvents;
//# sourceMappingURL=ability.events.js.map
