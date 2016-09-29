'use strict';

const should = require('should');
const Activity = require('../index');
const tensify = require('tensify');

const activityExample = {
  "@context": "http://www.w3.org/ns/activitystreams#",
  "id": "44da8f78-29ba-9a04-44c4-be3451a3b716",
  "name": "John Smith has commented on Presentation 98765421",
  "type": "Accept",
  "actor": {
    "id": "98765",
    "type": "Person",
    "attributedTo": "jsmith@fakedomain.com",
    "name": "John Smith"
  },
  "published": "2016-09-15T21:06:47Z",
  "object": {
    "id": "123456",
    "type": "Comment",
    "name": "I love memes! They're the best form of humor."
  },
  "target": {
    "id": "98765421",
    "type": "Presentation",
    "href": "http://www.fakedomain.com/image/id",
    "mediaType": "mime/jpeg",
    "name": "JPG.jpg"
  },
  "content": "This is my content"
};
const noTargetName = `${activityExample.actor.name} has ${tensify(activityExample.type.toLowerCase()).past} ${activityExample.object.name}`;

describe('Run all tests', () => {
  describe('Create activity', () => {
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
      activity.object().should.equal(activityExample.object);
      done();
    });

    it('should allow name to be set manually', (done) => {
      let activity = new Activity();
      activity.name().length.should.equal(0);

      activity.name(activityExample.name);
      activity.name().should.equal(activityExample.name);
      done();
    });

    it ("should generate name for object without target if we don't set it manually", (done) => {
      let activity = new Activity();
      activity.name().length.should.equal(0);
      activity.actor(activityExample.actor);
      activity.object(activityExample.object);
      activity.type(activityExample.type);

      activity.actor().id.should.equal(activityExample.actor.id);
      activity.object().id.should.equal(activityExample.object.id);
      activity.type().should.equal(activityExample.type);

      activity.toJSON().name.should.equal(noTargetName);
      done();

    });
    it ("should generate name for object/target if we don't set it manually", (done) => {
      let activity = new Activity();
      activity.name().length.should.equal(0);
      activity.actor(activityExample.actor);
      activity.object(activityExample.object);
      activity.target(activityExample.target);
      activity.type(activityExample.type);

      activity.actor().id.should.equal(activityExample.actor.id);
      activity.object().id.should.equal(activityExample.object.id);
      activity.type().should.equal(activityExample.type);

      activity.toJSON().name.should.equal(activityExample.name);
      done();

    });

    it('should not override a manual name with a generated name', () => {
      let activity = new Activity();
      activity.name().length.should.equal(0);
      activity.actor(activityExample.actor);
      activity.object(activityExample.object);
      activity.type(activityExample.type);

      activity.actor().id.should.equal(activityExample.actor.id);
      activity.object().id.should.equal(activityExample.object.id);
      activity.type().should.equal(activityExample.type);

      activity.toJSON().name.should.equal(noTargetName);

      let fakeName = "Toto, I've a feeling we're not in Kansas anymore.";
      activity.name(fakeName);
      activity.name().should.equal(fakeName);
      activity.toJSON().name.should.equal(fakeName);
    });

    it('should allow object to be set manually', (done) => {
      let activity = new Activity();
      Object.keys(activity.object()).length.should.equal(0);

      activity.object(activityExample.object);
      activity.object().id.should.equal(activityExample.object.id);
      done();
    });

    it('should allow actor to be set manually', (done) => {
      let activity = new Activity();
      Object.keys(activity.actor()).length.should.equal(0);

      activity.actor(activityExample.actor);
      activity.actor().id.should.equal(activityExample.actor.id);
      done();
    });

    it('should allow target to be set manually', (done) => {
      let activity = new Activity();
      Object.keys(activity.target()).length.should.equal(0);

      activity.target(activityExample.target);
      activity.target().id.should.equal(activityExample.target.id);
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

    it('should allow meta to be set as an object or a string', (done) => {
      let activity = new Activity(activityExample);
      should.not.exist(activity.meta());

      let metadata = { recipients: ["email1@email.com", "email2@email.com"], clientId: "clientId" };

      activity.meta(metadata);
      activity.toJSON().meta.recipients.should.equal(metadata.recipients);
      activity.toJSON().meta.clientId.should.equal(metadata.clientId);
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
      activity.object(activityExample.object)
        .type(activityExample.type)
        .target(activityExample.target)
        .actor(activityExample.actor)
        .content(activityExample.content);

      let activityJSONString = activity.toString();
      let json = JSON.parse(activityJSONString);

      json.actor.id.should.equal(activityExample.actor.id);
      json.object.id.should.equal(activityExample.object.id);
      json.type.should.equal(activityExample.type);
      should.exist(json.published);
      should.exist(json['@context']);
      Object.keys(json).length.should.equal(Object.keys(activityExample).length);
      Object.keys(json.actor).length.should.equal(Object.keys(activityExample.actor).length);
      Object.keys(json.target).length.should.equal(Object.keys(activityExample.target).length);
      Object.keys(json.object).length.should.equal(Object.keys(activityExample.object).length);

      done();

    });
    it('- toJson() should output correctly', (done) => {
      let activity = new Activity();
      activity.target(activityExample.target);
      activity.object(activityExample.object);
      activity.type(activityExample.type);
      activity.actor(activityExample.actor);
      activity.content(activityExample.content);

      let activityJSON = activity.toJSON();

      activityJSON.actor.id.should.equal(activityExample.actor.id);
      activityJSON.object.id.should.equal(activityExample.object.id);
      activityJSON.type.should.equal(activityExample.type);
      should.exist(activityJSON.published);
      should.exist(activityJSON['@context']);
      Object.keys(activityJSON).length.should.equal(Object.keys(activityExample).length);
      Object.keys(activityJSON.actor).length.should.equal(Object.keys(activityExample.actor).length);
      Object.keys(activityJSON.target).length.should.equal(Object.keys(activityExample.target).length);
      Object.keys(activityJSON.object).length.should.equal(Object.keys(activityExample.object).length);

      done();

    });
  });
});
