import http from 'request-promise';

export default class Navitia {
    constructor(token) {
        this.token = token;
    }

    getFirstPlace(query, types) {
        return this.getPlaces(query, types)
            .then((placesResponse) => {
                return (placesResponse.places.length > 0)? placesResponse.places[0] : null
            });
    }

    getPlaces(query, types = []) {
        let url = `http://api.navitia.io/v1/coverage/fr-idf/places?q=${query}`;
        types.forEach(type => {
            url += `&type[]=${type}`;
        });
        return this.get(url);
    }

    getDepartures(origin) {
        return this.get(`http://api.navitia.io/v1/coverage/fr-idf/stop_areas/${origin}/departures`);
    }

    getJourneys(from, to, arrivalDatetime) {
        return this.get(`http://api.navitia.io/v1/coverage/fr-idf/journeys?from=${from}&to=${to}&datetime=${toISODatetime(arrivalDatetime)}&datetime_represents=arrival&forbidden_uris[]=network:OIF:56`);
    }

    get(url) {
        console.log();
        console.log(url);
        console.log();

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