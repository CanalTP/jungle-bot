import { LastDeparture, baseRoutes as LastDepartureBaseRoutes } from './routes/LastDeparture.js'
import { NextDepartures, baseRoutes as NextDeparturesBaseRoutes } from './routes/NextDepartures.js'
import { Isochron, baseRoutes as IsochronBaseRoutes } from './routes/Isochron.js'
import { Journeys, baseRoutes as JourneysBaseRoutes } from './routes/Journeys.js'

export const Router = (message) => {

  // last departures
  const lastDepartureMatches = (message) => {
    return LastDepartureBaseRoutes.filter((baseRoute) => {return isRouteMatching(baseRoute, message)});
  };

  if (lastDepartureMatches(message.object.content).length) {
    return LastDeparture(message);
  }

  // next departures
  const nextDepartureMatches = (message) => {
    return NextDeparturesBaseRoutes.filter((baseRoute) => {return isRouteMatching(baseRoute, message)});
  };

  if (nextDepartureMatches(message.object.content).length) {
    return NextDepartures(message);
  }

  // isochron
  const isochronMatches = (message) => {
    return IsochronBaseRoutes.filter((baseRoute) => {return isRouteMatching(baseRoute, message)});
  };

  if (isochronMatches(message.object.content).length) {
    return Isochron(message);
  }

    // journeys
    const journeysMatches = (message) => {
        return JourneysBaseRoutes.filter((baseRoute) => {return isRouteMatching(baseRoute, message)});
    };

    if (journeysMatches(message.object.content).length) {
      console.log('journey');
        return Journeys(message);
    }
};

export const isRouteMatching = (regex, message) => {
  const regexp = new RegExp(regex, 'gi');

  return regexp.test(message);
};

export const getRouteParameters = (regex, str) => {
  console.log(regex, str);
  const regexp = new RegExp(regex, 'gi');
  const regexpResult = regexp.exec(str);
  console.log(regexpResult);
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
