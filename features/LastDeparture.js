import LastDeparturesMessageBuilder from "../lib/output/LastDepartureMessageBuilder";
import Navitia from "../lib/ws/Navitia";

const navitia = new Navitia('5c60fc34-e017-4c9e-9744-13515c6436d8');

export default {
    getLastDeparture: (message, origin, destination, hasLastDepartureCallback, noDepartureCallback, placeNotFoundCallback) => {
        Promise.all([
            navitia.getFirstPlace(origin),
            navitia.getFirstPlace(destination)
        ])
            .then(places => {
                let [originPlace, destinationPlace] = places;
                let date = new Date();
                if (date.getHours() > 5) {
                    date.setDate(date.getDate() + 1);
                }
                date.setHours(5);
                date.setMinutes(0);
                date.setSeconds(0);
                navitia.getJourneys(originPlace.id, destinationPlace.id, date, 'arrival')
                    .then(journeysResponse => {
                        const builder = new LastDeparturesMessageBuilder(message);
                        const reply = builder.getReplyFromNavitia(destinationPlace, journeysResponse);
                        hasLastDepartureCallback(reply);
                    })
                    .catch(result => {
                        console.log(result);
                        noDepartureCallback(destinationPlace.name);
                    });
            })
            .catch(result => {
                placeNotFoundCallback(destination);
            });
    }
}
