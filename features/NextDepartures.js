import Navitia from '../lib/navitia';
import Router from '../lib/router';

const navitia = new Navitia('5c60fc34-e017-4c9e-9744-13515c6436d8');

export default {
    getNextDepartures: (type, origin, hasNextDeparturesCallback, noScheduleCallback, placeNotFoundCallback) => {
        navitia.getFirstPlace(origin, ["stop_area"])
            .then(place => {
                navitia.getDepartures(place.id)
                    .then(departuresResponse => {
                        let replyMessage = `Prochains passages à ${place.name}\n`;
                        departuresResponse.departures.forEach(departure => {
                            let physical_mode;
                            departure.links.forEach(link => {
                                if (link.type == 'physical_mode') {
                                    physical_mode = link.id;
                                }
                            });
                            replyMessage += `${formatDatetime(departure.stop_date_time.departure_date_time)} - ${getPicto(physical_mode)} \`${departure.display_informations.code}\` en direction de ${departure.display_informations.direction}\n`;
                        });
                        hasNextDeparturesCallback(replyMessage);
                    })
                    .catch(result => {
                        noScheduleCallback(place.name);
                    });
            })
            .catch(result => {
                placeNotFoundCallback(origin);
            });
    }
}

function getPicto(physical_mode) {
    switch (physical_mode) {
        case 'physical_mode:Bus':
            return ':bus:';
        case 'physical_mode:Metro':
            return ':metro:';
        case 'physical_mode:Train':
            return ':steam_locomotive:';
        case 'physical_mode:RapidTransit':
            return ':light_rail:';
        case 'physical_mode:Tramway':
            return ':tram:';
        case 'physical_mode:Car':
            return ':car:';
        case 'physical_mode:Bike':
        case 'physical_mode:BikeSharingService':
            return ':bike:';
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
