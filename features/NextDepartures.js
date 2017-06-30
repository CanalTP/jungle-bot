import Router from '../router/router';
import Navitia from "../lib/ws/Navitia";
import R from "ramda";
import DeparturesMessageBuilder from "../lib/output/DeparturesMessageBuilder";

const navitia = new Navitia('5c60fc34-e017-4c9e-9744-13515c6436d8');

export default {
    getNextDepartures: (message, hasNextDeparturesCallback, noScheduleCallback, placeNotFoundCallback) => {
        const messageBody = R.path(['object', 'content'], message);

        Router('prochain(?:s)? (.*)? (?:de|à|pour) (.*)', messageBody, (type, origin) => {
            navitia.getFirstPlace(origin, ["stop_area"])
                .then(place => {
                    navitia.getDepartures(place.id)
                        .then(departuresResponse => {
                            const builder = new DeparturesMessageBuilder(message);
                            const reply = builder.getReply(departuresResponse);
                            hasNextDeparturesCallback(reply);
                        })
                        .catch(result => {
                            noScheduleCallback(place.name);
                        });
                })
                .catch(result => {
                    placeNotFoundCallback(origin);
                });
        });
    }
}
