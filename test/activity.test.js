'use strict';

const should = require('should');
const Activity = require('../index');

const activityExample = {
  "@context": "http://www.w3.org/ns/activitystreams#",
  "id": "44da8f78-29ba-9a04-44c4-be3451a3b716",
  "type": "Accept",
  "actor": {
    "id": "98765",
    "type": "Person",
    "attributedTo": "skushch@intersog.com",
    "name": "I don't know his name"
  },
  "published": "2016-09-15T21:06:47Z",
  "target": {
    "id": "123456",
    "type": "Link",
    "href": "http://www.wiredrive.com/someAsset/id",
    "mediaType": "mime/jpeg",
    "name": "JPG.jpg"
  },
  "content": "This is my content"
};

describe('Run all tests', () => {
  describe('Create object', () => {
    it('should have empty fields when none are supplied', (done) => {
      let activity = new Activity();
      Object.keys(activity.actor()).length.should.equal(0);
      Object.keys(activity.target()).length.should.equal(0);
      activity.type().length.should.equal(0);
      should.not.exist(activity.content());
      done();
    });

    it('should have populated fields if they are supplied', (done) => {
      let activity = new Activity(activityExample);
      activity.actor().id.should.equal(activityExample.actor.id);
      activity.target().id.should.equal(activityExample.target.id);
      activity.type().should.equal(activityExample.type);
      activity.content().should.equal(activityExample.content);
      done();
    });

    it('should allow actor to be set manually', (done) => {
      let activity = new Activity();
      Object.keys(activity.actor()).length.should.equal(0);

      activity.actor(activityExample.actor);
      activity.actor().id.should.equal('98765');
      done();
    });

    it('should allow target to be set manually', (done) => {
      let activity = new Activity();
      Object.keys(activity.target()).length.should.equal(0);

      activity.target(activityExample.target);
      activity.target().id.should.equal('123456');
      done();
    });

    it('should allow type to be set manually', (done) => {
      let activity = new Activity();
      activity.type().length.should.equal(0);

      activity.type(activityExample.type);
      activity.type().should.equal(activityExample.type);
      done();
    });

    it('should allow content to be set manually', (done) => {
      let activity = new Activity();
      should.not.exist(activity.content());

      activity.content(activityExample.content);
      activity.content().should.equal(activityExample.content);
      done();
    });

    it('should allow content to be an object or a string', (done) => {
      let activity = new Activity();
      should.not.exist(activity.content());

      activity.content(activityExample.content);
      activity.content().should.equal(activityExample.content);

      let content = {
        type: "Note",
        name: "This is my content"
      };

      activity.content(content);
      activity.content().should.equal(content);
      done();
    })

  });
  describe('Output functions', () => {

    it('- toString() should output correctly', (done) => {
      let activity = new Activity();
      activity.target(activityExample.target)
        .type(activityExample.type)
        .actor(activityExample.actor)
        .content(activityExample.content);

      let activityJSONString = activity.toString();
      let json = JSON.parse(activityJSONString);

      json.actor.id.should.equal(activityExample.actor.id);
      json.target.id.should.equal(activityExample.target.id);
      json.type.should.equal(activityExample.type);
      should.exist(json.published);
      should.exist(json['@context']);
      Object.keys(json).length.should.equal(Object.keys(activityExample).length);
      Object.keys(json.actor).length.should.equal(Object.keys(activityExample.actor).length);
      Object.keys(json.target).length.should.equal(Object.keys(activityExample.target).length);

      done();

    });
    it('- toJson() should output correctly', (done) => {
      let activity = new Activity();
      activity.target(activityExample.target);
      activity.type(activityExample.type);
      activity.actor(activityExample.actor);
      activity.content(activityExample.content);

      let activityJSON = activity.toJSON();

      activityJSON.actor.id.should.equal(activityExample.actor.id);
      activityJSON.target.id.should.equal(activityExample.target.id);
      activityJSON.type.should.equal(activityExample.type);
      should.exist(activityJSON.published);
      should.exist(activityJSON['@context']);
      Object.keys(activityJSON).length.should.equal(Object.keys(activityExample).length);
      Object.keys(activityJSON.actor).length.should.equal(Object.keys(activityExample.actor).length);
      Object.keys(activityJSON.target).length.should.equal(Object.keys(activityExample.target).length);

      done();

    });
  });
});
