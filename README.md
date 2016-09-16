# JSON Activity Stream-ish

## History ##

We started writing an activity user stream that used [JSON Activity Stream](http://activitystrea.ms) but was  bit overly strict for us.  We needed things verbs like 'Download' which aren't available in the stream.  I wrote this to simplify our actions.  It's a *VERY* simple implementation that produces JSON Activity Stream style JSON output.

## To Begin ##

1.  Install it:
  `npm install json-activity-streamish --save`

2.  Require it and use:
```
  const Activity = require('json-activity-streamish')
   let activity = new Activity();
   // <Set the actor, target and type fields as below>
   // Render JSON string
   console.log(activity.toJSON());
```

## Example Usage ##

```
const Activity = require('json-activity-streamish');
// Create a new activity and manually set fields
let activity = new Activity();
activity.type('Accept');
activity.actor({
  "id": "98765",
  "type": "Person",
  "attributedTo": "john.smith@myfakedomain.com",
  "name": "I don't know his name"
});
activity.target({
  "id": "123456",
  "type": "Link",
  "href": "http://www.fakedomain.com/image/123456",
  "mediaType": "mime/jpeg",
  "name": "JPG.jpg"
})
console.log(activity.toJSON());

/* Output:
{
	"@context": "http://www.w3.org/ns/activitystreams#",
	"id": "4cfba82c-7af1-1b61-f686-c3be9aefea2e",
	"actor": {
		"id": "98765",
		"type": "Person",
		"attributedTo": "john.smith@myfakedomain.com",
		"name": "I don't know his name"
	},
	"target": {
		"id": "123456",
		"type": "Link",
		"href": "http://www.fakedomain.com/image/123456",
		"mediaType": "mime/jpeg",
		"name": "JPG.jpg"
	},
	"type": "Accept",
	"published": "2016-09-16T13:19:22.224Z"
}
*/

// Populate all data on creation
let secondActivity = new Activity({
  "actor": {
		"id": "98765",
		"type": "Person",
		"attributedTo": "john.smith@myfakedomain.com",
		"name": "I don't know his name"
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
// Produces the same output as up above
console.log(secondActivity.toJSON());

```
