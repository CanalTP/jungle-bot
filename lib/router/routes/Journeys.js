import Features from '../../../Features';
import { getRouteParameters, isRouteMatching } from '../index.js';

export const baseRoutes = [
    'iti de (.*)? vers (.*)',
    'itineraire de (.*)? vers (.*)',
    'itineraires de (.*)? vers (.*)',
];

export const Journeys = (message) => {
  const messageText = message.object.content;
  const regexParam = getRouteParameters('iti de (.*)? vers (.*)', messageText);

  if (regexParam[2] === void 0 || regexParam[1] === void 0) {
    return ;
  }

  Features.journeys(message, regexParam[1], regexParam[2]);
};
