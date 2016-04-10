/**
 * Personas model events
 */

'use strict';

import {EventEmitter} from 'events';
var Personas = require('../../sqldb').Personas;
var PersonasEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PersonasEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Personas.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    PersonasEvents.emit(event + ':' + doc._id, doc);
    PersonasEvents.emit(event, doc);
    done(null);
  }
}

export default PersonasEvents;
