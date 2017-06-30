import NavitiaMessageBuilder from "./NavitiaMessageBuilder";

export default class DeparturesMessageBuilder extends NavitiaMessageBuilder{

    getReply(departuresResponse) {
        let replyMessage = `Prochains passages à ${place.name}\n`;
        departuresResponse.departures.forEach(departure => {
            let physical_mode;
            departure.links.forEach(link => {
                if (link.type == 'physical_mode') {
                    physical_mode = link.id;
                }
            });

            const datetime = this.formatDatetime(departure.stop_date_time.departure_date_time);
            const picto = this.getPicto(physical_mode);
            const lineCode = departure.display_informations.code;
            const lineDirection = departure.display_informations.direction;

            replyMessage += `${datetime} - ${picto} \`${lineCode}\` en direction de ${lineDirection}\n`;
        });

        return this.getReply(replyMessage);
    }
}
