import Rx from 'rxjs/Rx';
import R from 'ramda';
import BroidSlack from 'broid-slack';
import Routes from './Routes';
import {clients} from './lib/clients';
import {token} from './lib/token';

clients.slack = new BroidSlack({
    token: token,
    http: {
        host: '127.0.0.1',
        port: process.env.PORT || 8080,
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
            R.map(route => route.execute(message), Routes);
        }
    },
    error: err => console.error(`Something went wrong: ${err.message}`),
});
