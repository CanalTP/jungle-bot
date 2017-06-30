import DeparturesMessageBuilder from "../lib/output/DeparturesMessageBuilder";
import Navitia from "../lib/ws/Navitia";

const navitia = new Navitia('5c60fc34-e017-4c9e-9744-13515c6436d8');

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

