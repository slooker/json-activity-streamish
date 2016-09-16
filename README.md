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
  .target({
    "id": "123456",
    "type": "Link",
    "href": "http://www.fakedomain.com/image/123456",
    "mediaType": "mime/jpeg",
    "name": "JPG.jpg"
  });
```

Note that `name` will be generated for you from your `type`, `actor` and `target` if you don't set it explicitly.

You can output to a json object or to a json representation of a string.

```
// Output to a JSON object
activity.toJSON();

// Out put to a JSON string repesentation
activity.toString();
```
