'use strict';

const guid = require('guid');
const tensify = require('tensify');

let activityClass = class JSONActivityStreamish {
  constructor(args) {
    this._id = guid.raw();
    this._name = args && args.name ? args.name : '';
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

  meta(newMeta) {
    if (newMeta) {
      this._meta = newMeta;
      return this;
    }
    return this._meta;
  }

  name(newName) {
    if (newName) {
      this._name = newName;
      return this;
    }
    return this._name;
  }

  toJSON() {
    let object = {
      '@context': this._context,
      id: this._id,
      actor: this._actor,
      target: this._target,
      type: this._type,
      published: this._published
    };
    if (!this._name) {
      this._name = `${this._actor.name} has ${tensify(this._type.toLowerCase()).past} ${this._target.name}`;
    }
    object.name = this._name;

    if (this._content) {
      object.content = this._content;
    }
    if (this._meta) {
      object.meta = this._meta;
    }
    return object;
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}

module.exports = activityClass;
