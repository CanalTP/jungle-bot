const Rx = require("rxjs/Rx");
const R = require("ramda");
const BroidSlack = require("@broid/slack");

const slack = new BroidSlack({
    token: 'xoxb-204765474528-Pdk3SXyymgMKmJSKbMqcATYQ',
    http: {
        host: '127.0.0.1',
        port: 8080,
    }  
});

slack.connect().subscribe({
    next: data => console.log(data),
    error: err => console.error(`Something went wrong: ${err.message}`),
    complete: () => console.log('complete')
});

const formatted_message = {
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Create",
  "generator": {
    "id": "f6e92eb6-f69e-4eae-8158-06613461cf3a",
    "type": "Service",
    "name": "slack"
  },
  "object": {
    "type": "Note",
    "content": "Come eat bitches!"
  },
  "to": {
    "type": "Group",
    "id": "C61FFEKN1"
  }
};

slack.send(formatted_message)
    .then(() => console.log('ok'))
    .catch(err => console.error(err));
