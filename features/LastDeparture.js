import Router from '../router/router';
import Navitia from "../lib/ws/Navitia";
import R from "ramda";
import LastDeparturesMessageBuilder from "../lib/output/LastDepartureMessageBuilder";

const navitia = new Navitia('5c60fc34-e017-4c9e-9744-13515c6436d8');

export default {
    getLastDeparture: (message, hasLastDepartureCallback, noDepartureCallback, placeNotFoundCallback) => {
        const messageBody = R.path(['object', 'content'], message);

        Router('Dernier départ vers (.*)', messageBody, (destination) => {
            navitia.getFirstPlace(destination)
                .then(place => {
                    let date = new Date();
                    if (date.getHours() > 5) {
                        date.setDate(date.getDate() + 1);
                    }
                    date.setHours(5);
                    date.setMinutes(0);
                    date.setSeconds(0);
                    navitia.getJourneys('stop_area:OIF:SA:8768600', place.id, date)
                        .then(journeysResponse => {
                            const builder = new LastDeparturesMessageBuilder(message)
                            const reply = builder.getReply(journeysResponse)
                            hasLastDepartureCallback(reply);
                        })
                        .catch(result => {
                            noDepartureCallback(place.name);
                        });
                })
                .catch(result => {
                    placeNotFoundCallback(destination);
                });
        });
    }
}
