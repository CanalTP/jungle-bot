const Rx = require("rxjs/Rx");
const R = require("ramda");
const BroidSlack = require("@broid/slack");

const clients = {
    slack: new BroidSlack({
        token: 'xoxb-204765474528-Pdk3SXyymgMKmJSKbMqcATYQ',
        http: {
            host: '127.0.0.1',
            port: 8080,
        }
    })
};

Rx.Observable.merge(...R.map(client => client.connect(), R.values(clients))).subscribe({
    next: data => console.log(JSON.stringify(data, null, 2)),
    error: err => console.error(`Something went wrong: ${err.message}`),
});

Rx.Observable.merge(...R.map(client => client.listen(), R.values(clients))).subscribe({
    next: message => console.log(JSON.stringify(message, null, 2)),
    error: err => console.error(`Something went wrong: ${err.message}`),
});
