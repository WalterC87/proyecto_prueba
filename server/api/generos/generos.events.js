/**
 * Generos model events
 */

'use strict';

import {EventEmitter} from 'events';
var Generos = require('../../sqldb').Generos;
var GenerosEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
GenerosEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Generos.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    GenerosEvents.emit(event + ':' + doc._id, doc);
    GenerosEvents.emit(event, doc);
    done(null);
  }
}

export default GenerosEvents;
