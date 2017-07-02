import Features from '../../../Features';
import { getRouteParameters, isRouteMatching } from '../index.js';

const baseRoutes = [
    'iti de (.*)? vers (.*)',
];

export const isJourneysRequest = (message) => {
  const routesMatch = baseRoutes.filter((baseRoute) => isRouteMatching(baseRoute, message));

  return routesMatch.length > 0;
};

export const handleJourneysRequest = (message) => {
  const messageText = message.object.content;
  const regexParam = getRouteParameters('iti de (.*)? vers (.*)', messageText);

  if (regexParam[2] === void 0 || regexParam[1] === void 0) {
    return ;
  }

  Features.journeys(message, regexParam[1], regexParam[2]);
};
