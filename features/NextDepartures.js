import DeparturesMessageBuilder from "../lib/output/DeparturesMessageBuilder";
import Navitia from "../lib/ws/Navitia";

const navitia = new Navitia();

export default {
    getNextDepartures: (message, type, origin, hasNextDeparturesCallback, noScheduleCallback, placeNotFoundCallback) => {
        navitia.getFirstPlace(origin, ["stop_area"])
            .then(place => {
                navitia.getDepartures(place.id)
                    .then(departuresResponse => {
                        const builder = new DeparturesMessageBuilder(message);
                        const reply = builder.getReplyFromNavitia(place, departuresResponse);
                        hasNextDeparturesCallback(reply);
                    })
                    .catch(result => {
                        console.log(result);
                        noScheduleCallback(place.name);
                    });
            })
            .catch(result => {
                placeNotFoundCallback(origin);
            });
    }
}

