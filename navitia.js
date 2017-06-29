import Navitia from './lib/navitia';

let ws = new Navitia('5c60fc34-e017-4c9e-9744-13515c6436d8');
ws.getFirstPlace('bussy saint georges')
    .then(place => {
        // console.log(place);
        let date = new Date();
        if (date.getHours() > 5) {
            date.setDate(date.getDate() + 1);
        }
        date.setHours(5);
        date.setMinutes(0);
        date.setSeconds(0);
        ws.getJourneys('stop_area:OIF:SA:8768600', place.id, date)
            .then(results => {
                console.log(results.journeys[0].departure_date_time);
            })
            .catch(result => console.log("No result bitch !!"));
    })
    .catch(result => console.log("No result bitch !!"));
