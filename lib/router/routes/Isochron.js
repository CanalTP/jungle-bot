import Features from '../../../Features';
import { getRouteParameters, isRouteMatching } from '../index.js';

const baseRoutes = [
  'temps de trajet à partir de (.*) dans un rayon de ([0-9]+) minutes',
];

export const isIsochronRequest = (message) => {
  const routesMatch = baseRoutes.filter((baseRoute) => isRouteMatching(baseRoute, message));

  return routesMatch.length > 0;
};

export const handleIsochronRequest = (message) => {
  const messageText = message.object.content;
  const regexParam = getRouteParameters('temps de trajet à partir de (.*) dans un rayon de ([0-9]+) minutes', messageText);

  if (regexParam[2] === void 0 || regexParam[1] === void 0) {
    return ;
  }

  Features.isochron(message, regexParam[1], regexParam[2]);
};
