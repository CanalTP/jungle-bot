import Router from './lib/router';
import Features from './Features';

export default {
    lastDeparture: {
        execute: (message) => {
            Router('Dernier départ vers (.*)', message.object.content, (destination) => {
                Features.lastDeparture(message, destination);
            });
        }
    },
    nextDepartures: {
        execute: (message) => {
            Router('prochain(?:s)? (.*)? (?:de|à|pour) (.*)', message.object.content, (type, origin) => {
                Features.nextDepartures(message, type, origin);
            });
        }
    },
    isochron: {
        execute: (message) => {
            Router('temps de trajet à partir de (.*) dans un rayon de ([0-9]+) minutes', message.object.content, (origin, duration) => {
                Features.isochron(message, origin, duration);
            });
        }
    },
    journeys: {
        execute: (message) => {
            Router('iti de (.*)? vers (.*)', message.object.content, (origin, destination) => {
                Features.journeys(message, origin, destination);
            });
        }
    }
}
    