const Rx = require('rxjs/Rx');
const R = require('ramda');
const BroidSlack = require('@broid/slack');
const MessageParser = require('./MessageParser');
const MessageBuilder = require('./MessageBuilder');

const clients = {
    slack: new BroidSlack({
        token: 'xoxb-204765474528-rvZEtEhD8WyTQNbD1YRa4cW6',
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
        const target = MessageParser.getTarget(message);
        const generator = MessageParser.getGenerator(message);
        const reply = MessageBuilder.getReply("Ma réponse est 42", target, generator);
        return clients[generator.name].send(reply);
    },
    error: err => console.error(`Something went wrong: ${err.message}`),
});
