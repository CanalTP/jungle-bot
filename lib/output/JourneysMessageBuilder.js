import NavitiaMessageBuilder from "./NavitiaMessageBuilder";

export default class JourneysMessageBuilder extends NavitiaMessageBuilder{

    getReplyFromNavitia(originPlace, destinationPlace, journeysResponse) {
        let replyMessage = `Partir de ${originPlace.name}\n`;
        journeysResponse.journeys[0].sections.forEach(section => {
            let physical_mode;
            if (section.type == 'public_transport') {
                section.links.forEach(link => {
                    if (link.type == 'physical_mode') {
                        physical_mode = link.id;
                    }
                });

                const datetime = this.formatDatetime(section.departure_date_time);
                const picto = this.getPicto(physical_mode);
                const lineCode = section.display_informations.code;
                const lineDirection = section.display_informations.direction;

                replyMessage += `${datetime} - ${picto} \`${lineCode}\` en direction de ${lineDirection}\n`;
            }
        });
        replyMessage += `Arriver à ${destinationPlace.name}`;

        return this.getReply(replyMessage);
    }
}
