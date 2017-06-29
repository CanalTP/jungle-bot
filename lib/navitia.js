import http from 'request-promise';

export default class Navitia {
    constructor(token) {
        this.token = token;
    }

    getFirstPlace(query) {
        return this.getPlaces(query)
            .then((placesResponse) => {
                return (placesResponse.places.length > 0)? placesResponse.places[0] : null
            });
    }

    getPlaces(query) {
        return this.get(`http://api.navitia.io/v1/coverage/fr-idf/places?q=${query}`);
    }

    getJourneys(from, to, arrivalDatetime) {
        return this.get(`http://api.navitia.io/v1/coverage/fr-idf/journeys?from=${from}&to=${to}&datetime=${toISODatetime(arrivalDatetime)}&datetime_represents=arrival&allowed_id[]=commercial_mode:rapidtransit`);
    }

    get(url) {
        var options = {
            uri: url,
            headers: {
                'Authorization': 'Basic ' + new Buffer(this.token).toString('base64')
            },
            json: true // Automatically parses the JSON string in the response
        };

        return http(options);
    }
}

let toISODatetime = function(datetime) {
    let parts = [
        datetime.getFullYear(),
        ("00" + (datetime.getMonth() + 1)).slice(-2),
        ("00" + datetime.getDate()).slice(-2),
        'T',
        ("00" + datetime.getHours()).slice(-2),
        ("00" + datetime.getMinutes()).slice(-2),
        ("00" + datetime.getSeconds()).slice(-2)
    ];

    return parts.join('');
};