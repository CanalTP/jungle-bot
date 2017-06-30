import Rx from 'rxjs/Rx';
import R from 'ramda';
import BroidSlack from 'broid-slack';
import MessageBuilder from './MessageBuilder';

import LastDeparture from './features/LastDeparture';
import NextDepartures from './features/NextDepartures';

const clients = {
    slack: new BroidSlack({
        token: 'xoxb-204765474528-A5mvMJXAgrpPS8EM8ScoPT3c',
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
        const messageBody = R.path(['object', 'content'], message);
        const senderType = R.path(['actor', 'type'], message);
        const generatorName = R.path(['generator', 'name'], message);

        if (messageType === 'Note' && senderType === 'Person') {
            LastDeparture.getLastDeparture(messageBody, (departureTime) => {
                const reply = MessageBuilder.getReply(":steam_locomotive: Faudra pas se louper, le dernier départ vers " + place.name + " est à :clock5: " + lastDeparture, message);
                clients[generatorName].send(reply)
                    .then(console.log)
                    .catch(console.error);
            }, (noDepartureForPlace) => {
                const reply = MessageBuilder.getReply("Désolé, y a plus aucun train pour " + noDepartureForPlace, message);
                clients[generatorName].send(reply)
                    .then(console.log)
                    .catch(console.error);
            }, (placeNotFound) => {
                const reply = MessageBuilder.getReply("Désolé je connais pas " + placeNotFound, message);
                clients[generatorName].send(reply)
                    .then(console.log)
                    .catch(console.error);
            });

            NextDepartures.getNextDepartures(messageBody, (nextDepartures) => {
                const reply = MessageBuilder.getReply(nextDepartures, message);
                clients[generatorName].send(reply)
                    .then(console.log)
                    .catch(console.error);
            }, (noScheduleForPlace) => {
                const reply = MessageBuilder.getReply(`Aucun horaire trouvé pour l'arrêt ${noScheduleForPlace}`, message);
                clients[generatorName].send(reply)
                    .then(console.log)
                    .catch(console.error);
            }, (placeNotFound) => {
                const reply = MessageBuilder.getReply(`Désolé je connais pas ${placeNotFound}`, message);
                clients[generatorName].send(reply)
                    .then(console.log)
                    .catch(console.error);
            });
        }
    },
    error: err => console.error(`Something went wrong: ${err.message}`),
});
