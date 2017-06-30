import { LastDeparture, baseRoutes as LastDepartureBaseRoutes } from './routes/LastDeparture.js'
import { NextDepartures, baseRoutes as NextDeparturesBaseRoutes } from './routes/NextDepartures.js'



export const Router = (message) => {

  const lastDepartureMatches = (message) => {
    return LastDepartureBaseRoutes.filter((baseRoute) => {return isRouteMatching(baseRoute, message)});
  };

  if (lastDepartureMatches(message).length) {
    return LastDeparture(message);
  }

  const nextDepartureMatches = (message) => {
    return NextDeparturesBaseRoute.filter((baseRoute) => {return isRouteMatching(baseRoute, message)});
  };

  if (nextDepartureMatches(message).length)) {
    return NextDepartures(message);
  }
};

export const isRouteMatching = (regex, message) => {
  // console.log(regex, message);
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
