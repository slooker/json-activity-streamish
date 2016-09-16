const guid = require('guid');

let activityClass = class JSONActivityStreamish {
  constructor(args) {
    this._id = guid.raw();
    this._context = 'http://www.w3.org/ns/activitystreams#';
    this._published = new Date().toISOString();
    this._actor = args && 'actor' in args ? args.actor : {};
    this._target = args && 'target' in args ? args.target : {};
    this._type = args && 'type' in args ? args.type : '';
  }

  // getter and setter in one.  Kind of ugly though.
  actor(newActor) {
    if (newActor) {
      this._actor = newActor;
      return;
    }
    return this._actor;
  }

  target(newTarget) {
    if (newTarget) {
      return this._target = newTarget;
      return;
    }
    return this._target;
  }

  type(newType) {
    if (newType) {
      return this._type = newType;
    }
    return this._type;
  }

  toJSON() {
    let object = {
      '@context': this._context,
      id: this._id,
      actor: this._actor,
      target: this._target,
      type: this._type,
      published: this._published
    }
    return JSON.stringify(object);
  }
}

module.exports = activityClass;
