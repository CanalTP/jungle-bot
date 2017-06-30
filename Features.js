import LastDeparture from './features/LastDeparture';
import NextDepartures from './features/NextDepartures';

export default {
    lastDeparture: (message, destination) => {
        LastDeparture.getLastDeparture(message, destination, (departureTime) => {
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
    },
    nextDepartures: (message, type, origin) => {
        NextDepartures.getNextDepartures(message, type, origin, (nextDepartures) => {
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
};

