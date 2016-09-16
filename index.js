const guid = require('guid');

let activityClass = class JSONActivityStreamish {
  constructor(args) {
    this._id = guid.raw();
    this._context = 'http://www.w3.org/ns/activitystreams#';
    this._published = new Date().toISOString();
    this._actor = args && 'actor' in args ? args.actor : {};
    this._target = args && 'target' in args ? args.target : {};
    this._type = args && 'type' in args ? args.type : '';
    if (args && args.content) {
      this._content = args.content;
    }
  }

  // getter and setter in one.  Kind of ugly though.
  actor(newActor) {
    if (newActor) {
      this._actor = newActor;
      return this;
    }
    return this._actor;
  }

  target(newTarget) {
    if (newTarget) {
      this._target = newTarget;
      return this;
    }
    return this._target;
  }

  type(newType) {
    if (newType) {
      this._type = newType;
      return this;
    }
    return this._type;
  }

  content(newContent) {
    if (newContent) {
      this._content = newContent;
      return this;
    }
    return this._content;
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
    if (this._content) {
      object.content = this._content;
    }
    return object;
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}

module.exports = activityClass;
