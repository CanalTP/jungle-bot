import Features from '../../../Features';
import { getRouteParameters, isRouteMatching } from '../index.js';

export const baseRoutes = [
  'prochain(?:s)? (.*)? (?:de|à|pour) (.*)',
];

export const NextDepartures = (message) => {
  const messageText = message.object.content;
  const regexParam = getRouteParameters('prochain(?:s)? (.*)? (?:de|à|pour) (.*)', messageText);

  if (regexParam[2] === void 0) {
    return ;
  }

  Features.nextDepartures(message, regexParam[1], regexParam[2]);
};
