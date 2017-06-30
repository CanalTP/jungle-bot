import Navitia from "../lib/ws/Navitia";
import JourneysMessageBuilder from "../lib/output/JourneysMessageBuilder";

const navitia = new Navitia('5c60fc34-e017-4c9e-9744-13515c6436d8');

export default {
    getJourneys: (message, origin, destination, hasJourneysCallback, noJourneyCallback, placeNotFoundCallback) => {
        Promise.all([
            navitia.getFirstPlace(origin),
            navitia.getFirstPlace(destination)
        ])
            .then(places => {
                let [originPlace, destinationPlace] = places;
                let date = new Date();
                navitia.getJourneys(originPlace.id, destinationPlace.id, date)
                    .then(journeysResponse => {
                        const builder = new JourneysMessageBuilder(message);
                        const reply = builder.getReplyFromNavitia(originPlace, destinationPlace, journeysResponse);
                        hasJourneysCallback(reply);
                    })
                    .catch(result => {
                        console.log(result);
                        noJourneyCallback(originPlace.name, destinationPlace.name);
                    });
            })
            .catch(place => {
                placeNotFoundCallback(place);
            });
    }
}
