import Rx from 'rxjs/Rx';
import R from 'ramda';
import BroidSlack from 'broid-slack';
import MessageBuilder from './MessageBuilder';

const clients = {
    slack: new BroidSlack({
        token: 'xoxb-204765474528-bzImpkDGf62N4YVUjLMuLZzk',
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
    next: message => {
        const messageType = R.path(['object', 'type'], message);
        const senderType = R.path(['actor', 'type'], message);
        const generatorName = R.path(['generator', 'name'], message);
        if (messageType === 'Note' && senderType === 'Person') {
            const reply = MessageBuilder.getReply("Ma réponse est 42", message);
            clients[generatorName].send(reply)
                .then(console.log)
                .catch(console.error);
        }
    },
    error: err => console.error(`Something went wrong: ${err.message}`),
});
