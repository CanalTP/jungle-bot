import Rx from 'rxjs/Rx';
import R from 'ramda';
import BroidSlack from '@broid/slack';
import {Wit} from 'node-wit';
import {Router} from './lib/router/index.js';
import {clients} from './lib/clients';

clients.slack = new BroidSlack({
    token: process.env.SLACK_TOKEN,
    http: {
        host: '127.0.0.1',
        port: 8080,
    }
});

Rx.Observable.merge(...R.map(client => client.connect(), R.values(clients))).subscribe({
    next: data => console.log(JSON.stringify(data, null, 2)),
    error: err => console.error(`Something went wrong: ${err.message}`),
});

Rx.Observable.merge(...R.map(client => client.listen(), R.values(clients))).subscribe({
    next: message => {
        const messageType = R.path(['object', 'type'], message);
        const senderType = R.path(['actor', 'type'], message);

        if (messageType === 'Note' && senderType === 'Person') {
            Router(message);
            postMessageOnWit(message.object.content);
        }
    },
    error: err => console.error(`Something went wrong: ${err.message}`),
});

function postMessageOnWit(message) {
    if (process.env.WIT_TOKEN) {
        const client = new Wit({accessToken: process.env.WIT_TOKEN});
        client.message(message, {})
            .then((data) => {
                console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
            })
            .catch(console.error);
    }
}
