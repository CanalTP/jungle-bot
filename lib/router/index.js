import { isLastDepartureRequest, handleLastDepartureRequest } from './routes/LastDeparture.js'
import { isNextDeparturesRequest, handleNextDeparturesRequest } from './routes/NextDepartures.js'
import { isIsochronRequest, handleIsochronRequest } from './routes/Isochron.js'
import { isJourneysRequest, handleJourneysRequest } from './routes/Journeys.js'

export const Router = (message) => {
  if (isLastDepartureRequest(message.object.content))
    return handleLastDepartureRequest(message);

  if (isNextDeparturesRequest(message.object.content))
    return handleNextDeparturesRequest(message);

  if (isIsochronRequest(message.object.content))
    return handleIsochronRequest(message);

  if (isJourneysRequest(message.object.content))
    return handleJourneysRequest(message);
};

export const isRouteMatching = (regex, message) => {
  const regexp = new RegExp(regex, 'gi');

  return regexp.test(message);
};

export const getRouteParameters = (regex, str) => {
  const regexp = new RegExp(regex, 'gi');
  const regexpResult = regexp.exec(str);

  if (regexpResult !== null) {
    return regexpResult;
  }
};

// examples
// console.log(Router('pourriez vous me donner le dernier départ pour bussy saint-georges'));
// console.log(Router('pourriez vous me donner le toto départ pour bussy saint-georges'));
// console.log(Router('pourriez vous me donner le dernier départ pour bussy saint-georges depuis gare de lyon'));
// console.log(Router('pourriez vous me donner le dernier départ pour bussy saint-georges depuis la gare de lyon'));
// console.log(Router('pourriez vous me donner le dernier départ de gare de lyon pour bussy saint-georges '));
// console.log(Router('pourriez vous me donner le dernier départ pour bussy saint-georges en partant de gare de lyon'));
// console.log(Router('pourriez vous me donner le dernier départ vers bussy saint-georges en partant de gare de lyon'));
// console.log(Router('pourriez vous me donner le dernier départ a destination de bussy saint-georges en partant de gare de lyon'));
// console.log('true 2', Router('dernier depart', 'pourriez vous me donner le dernier depart, svp'));
// console.log('false', Router('pourriez vous me donner le premier départ, svp'));
// console.log(Router('prochain passage de gare de lyon'));
