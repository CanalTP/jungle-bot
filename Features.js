import LastDeparture from './features/LastDeparture';
import NextDepartures from './features/NextDepartures';
import MessageBuilder from "./lib/output/MessageBuilder";
import R from "ramda";
import {clients} from './lib/clients';

export default {
    lastDeparture: (message, destination) => {
        const messageBuilder = new MessageBuilder(message);

        LastDeparture.getLastDeparture(message, destination, (reply) => {
            sendMessage(message, reply);
        }, (noDepartureForPlace) => {
            const reply = messageBuilder.getReply(`Désolé, y a plus aucun train pour ${noDepartureForPlace}`);
            sendMessage(message, reply);
        }, (placeNotFound) => {
            const reply = messageBuilder.getReply(`Désolé je connais pas ${placeNotFound}`);
            sendMessage(message, reply);
        });
    },
    nextDepartures: (message, type, origin) => {
        const messageBuilder = new MessageBuilder(message);

        NextDepartures.getNextDepartures(message, type, origin, (reply) => {
            sendMessage(message, reply);
        }, (noScheduleForPlace) => {
            const reply = messageBuilder.getReply(`Aucun horaire trouvé pour l'arrêt ${noScheduleForPlace}`);
            sendMessage(message, reply);
        }, (placeNotFound) => {
            const reply = messageBuilder.getReply(`Désolé je connais pas ${placeNotFound}`);
            sendMessage(message, reply);
        });
    }
};

const sendMessage = function(message, reply) {
    const generatorName = R.path(['generator', 'name'], message);

    clients[generatorName].send(reply)
        .then(console.log)
        .catch(console.error);
};