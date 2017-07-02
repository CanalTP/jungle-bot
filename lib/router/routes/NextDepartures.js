import Features from '../../../Features';
import { getRouteParameters, isRouteMatching } from '../index.js';

const baseRoutes = [
  'prochain(?:s)? (.*)? (?:de|à|pour) (.*)',
];

export const isNextDeparturesRequest = (message) => {
  const routesMatch = baseRoutes.filter((baseRoute) => isRouteMatching(baseRoute, message));

  return routesMatch.length > 0;
}

export const handleNextDeparturesRequest = (message) => {
  const messageText = message.object.content;
  const regexParam = getRouteParameters('prochain(?:s)? (.*)? (?:de|à|pour) (.*)', messageText);

  if (regexParam[2] === void 0) {
    return ;
  }

  Features.nextDepartures(message, regexParam[1], regexParam[2]);
};
