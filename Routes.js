import Router from './lib/router';
import Features from './Features';

export default {
    lastDeparture: {
        execute: (message) => {
            Router('Dernier départ vers (.*)', message.object.content, (destination) => {
                Features.lastDeparture(message, destination)
            });
        }
    },
    nextDepartures: {
        execute: (message) => {
            Router('prochain(?:s)? (.*)? (?:de|à|pour) (.*)', message.object.content, (type, origin) => {
                Features.nextDepartures(message, type, origin)
            });
        }
    }
}
    