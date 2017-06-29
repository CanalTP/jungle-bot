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