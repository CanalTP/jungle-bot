import Rx from 'rxjs/Rx';
import R from 'ramda';
import BroidSlack from 'broid-slack';
import LastDeparture from './features/LastDeparture';
import NextDepartures from './features/NextDepartures';
import MessageBuilder from "./lib/output/MessageBuilder";

const clients = {
    slack: new BroidSlack({
        token: 'xoxb-204765474528-Ezx20uEUS8lXkROm1tHvarau',
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

        if (messageType === 'Note' && senderType === 'Person') {
            const messageBuilder = new MessageBuilder(message);

            LastDeparture.getLastDeparture(message, (reply) => {
                sendMessage(message, reply);
            }, (noDepartureForPlace) => {
                const reply = messageBuilder.getReply(`Désolé, y a plus aucun train pour ${noDepartureForPlace}`);
                sendMessage(message, reply);
            }, (placeNotFound) => {
                const reply = messageBuilder.getReply(`Désolé je connais pas ${placeNotFound}`);
                sendMessage(message, reply);
            });

            NextDepartures.getNextDepartures(message, (reply) => {
                sendMessage(message, reply);
            }, (noScheduleForPlace) => {
                const reply = messageBuilder.getReply(`Aucun horaire trouvé pour l'arrêt ${noScheduleForPlace}`);
                sendMessage(message, reply);
            }, (placeNotFound) => {
                const reply = messageBuilder.getReply(`Désolé je connais pas ${placeNotFound}`);
                sendMessage(message, reply);
            });
        }
    },
    error: err => console.error(`Something went wrong: ${err.message}`),
});

const sendMessage = function(message, reply) {
    const generatorName = R.path(['generator', 'name'], message);

    clients[generatorName].send(reply)
        .then(console.log)
        .catch(console.error);
};
