import Features from '../../../Features';
import { getRouteParameters, isRouteMatching } from '../index.js';

export const baseRoutes = [
  'prochain(?:s)? (.*)? (?:de|à|pour) (.*)',
];

export const NextDepartures = (message) => {
  const origin = getRouteParameters('prochain(?:s)? (.*)? (?:de|à|pour) (.*)', message);

  Features.nextDepartures(message, void 0, origin);
};
