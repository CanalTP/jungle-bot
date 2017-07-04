import Rx from 'rxjs/Rx';
import R from 'ramda';
import BroidSlack from 'broid-slack';
import { Router } from './lib/router/index.js';
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
        }
    },
    error: err => console.error(`Something went wrong: ${err.message}`),
});
