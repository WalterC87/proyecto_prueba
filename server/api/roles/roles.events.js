/**
 * Roles model events
 */

'use strict';

import {EventEmitter} from 'events';
var Roles = require('../../sqldb').Roles;
var RolesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RolesEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Roles.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    RolesEvents.emit(event + ':' + doc._id, doc);
    RolesEvents.emit(event, doc);
    done(null);
  }
}

export default RolesEvents;
