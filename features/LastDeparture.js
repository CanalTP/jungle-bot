import Navitia from '../lib/navitia';
import Router from '../lib/router';

const navitia = new Navitia('5c60fc34-e017-4c9e-9744-13515c6436d8');

export default {
    getLastDeparture: (destination, hasLastDepartureCallback, noDepartureCallback, placeNotFoundCallback) => {
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
                    .then(results => {
                        const lastDeparture = formatDatetime(results.journeys[0].departure_date_time);
                        hasLastDepartureCallback(lastDeparture);
                    })
                    .catch(result => {
                        noDepartureCallback(place.name);
                    });
            })
            .catch(result => {
                placeNotFoundCallback(destination);
            });
    }
}

function formatDatetime(datetime) {
    if (typeof datetime !== 'string') { return 'none'; }
    var formated = datetime.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/,
                                    '$4:$5');
    if (formated.slice(-2) === '00') {
        return formated.slice(0, -3);
    } else {
        return formated;
    }
};