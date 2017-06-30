import Features from '../../../Features.js';
import { getRouteParameters, isRouteMatching } from '..';

export const baseRoute = 'derniers?';

export const LastDeparture = (message) => {
  const destination = extractDestinationPoint(message);
  const origin = "gare de lyon";

  if (isRouteMatching('(?: depuis | de | en partant de )', message)) {

    const origin = extractOriginPoint(message);
  }

  Features.lastDeparture(message, destination, origin);
};

const extractDestinationPoint = (message) => {
  const destinationParamRaw1 = getRouteParameters('(?:pour|a destination de|vers) (.*)\w*(?:depuis |de |en partant |$)', message);

  if (destinationParamRaw1 === void 0) {
    // error : no destination found
    return ;
  }

  const destinationParam = getRouteParameters('(.*?)(?: depuis| de| en partant|$)', destinationParamRaw1[1]);

  return destinationParam[1];
};

const extractOriginPoint = (message) => {
  let originParamTemp = getRouteParameters('(?: depuis| de| en partant de) (.*?)\w*(?:pour |a destination de |vers |$)', message);
  let originParam = originParamTemp[1];

  // cas particulier : on repasse parce que ... voila quoi
  if (isRouteMatching(' en partant de ', originParam)) {
    const originParamTemp = getRouteParameters('(?: en partant de) (.*?)\w*(?:pour |a destination de |vers |$)', originParam);
    originParam = originParamTemp[1];
  }

  if (isRouteMatching('(?:pour |a destination de |vers )', originParam)) {
    const originParamTemp = getRouteParameters('(.*)\w*(?:pour |a destination de |vers |$)', originParam);
    originParam = originParamTemp[1];
  }

  return originParam;
};
