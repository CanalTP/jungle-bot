import { getRouteParameters, isRouteMatching } from '..';

export const baseRoute = 'derniers?';

export const LastDeparture = (message) => {
  console.log(message);
  const destination = extractDestinationPoint(message);
  console.log(destination);
  const origin = "gare de lyon";

  if (isRouteMatching('(?: depuis | de | en partant de )', message)) {

    const origin = extractOriginPoint(message);
  }
  return 'end';
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
  const originParamRaw1 = getRouteParameters('(?: depuis| de| en partant de) (.*)\w*(?:pour |a destination de |vers |$)', message);
  console.log(originParamRaw1[1]);

  if (isRouteMatching('(?:pour |a destination de |vers )')) {
    const originParam = getRouteParameters('(.*)\w*(?:pour |a destination de |vers |$)', originParamRaw1);
    console.log(originParam[1]);
  }



};
