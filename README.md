![Build Passing Image](https://travis-ci.org/slooker/json-activity-streamish.svg?branch=master)

# JSON Activity Stream-ish

## History ##

We started writing an activity user stream that used [JSON Activity Stream](http://activitystrea.ms) but was  bit overly strict for us.  We needed things verbs like 'Download' which aren't available in the stream.  I wrote this to simplify our actions.  It's a *VERY* simple implementation that produces JSON Activity Stream style JSON output.

## To Begin ##

1.  Install it:
```
  npm install json-activity-streamish --save
```

2.  Require it and use:
```
  const Activity = require('json-activity-streamish')
   let activity = new Activity();
   // <Set the actor, target and type fields as below>
   // Get JSON object
   console.log(activity.toJSON());
   // Get string representation of JSON object
   console.log(activity.toString());
```

### Notes ###
You can pass in all data when you create the activity like so:

```
let activity = new Activity({
  "name": "John Smith has accepted JPG.jpg",
  "actor": {
		"id": "98765",
		"type": "Person",
		"attributedTo": "john.smith@myfakedomain.com",
		"name": "John Smith"
	},
	"target": {
		"id": "123456",
		"type": "Link",
		"href": "http://www.fakedomain.com/image/123456",
		"mediaType": "mime/jpeg",
		"name": "JPG.jpg"
	},
	"type": "Accept",  
});
```

You can also set fields manually:

```
let activity = new Activity();
activity.type('Accept')
  .actor({
    "id": "98765",
    "type": "Person",
    "attributedTo": "john.smith@myfakedomain.com",
    "name": "John Smith"
  })
  .object({
    "id": "123456",
    "type": "Link",
    "href": "http://www.fakedomain.com/image/123456",
    "mediaType": "mime/jpeg",
    "name": "JPG.jpg"
  });
```

Note that `name` will be generated for you from your `type`, `actor` and `target` if you don't set it explicitly.  `id` will also be auto-populated using the [guid](https://www.npmjs.com/package/guid) module


We've added a `meta` field so that you can add any extraneous data that doesn't fit into JSON Activity Stream spec as well.  It works the same way as all of the other fields you can set.  

```
let activity = new Activity();
activity.meta({
  recipients: ["john.smith@myfakedomain.com", "jane.smith@myfakedomain.com"],
  someOtherField: "someOtherData"
});
```

You can return a json object or a json representation of a string.

```
// Get a JSON object
activity.toJSON();

// Output to a JSON string representation
activity.toString();
```

## Supported Functions ##

### Getters and Setters ###

All getters and setters can be called with an argument to set the argument, or without to get the property.

Here's a list of getters and setters:

* `* activity.actor()`
* `* activity.object()`
* `activity.target()`
* `* activity.type()`
* `activity.content()`
* `activity.meta()`
* `activity.name()`

* is a required field.

`.name()` will be auto generated for you if you do not supply it.

### Output ###

`toJSON()` will return a JSON object
`toString()` will return a string representation of the JSON object
