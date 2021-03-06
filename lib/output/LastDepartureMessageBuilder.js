import NavitiaMessageBuilder from "./NavitiaMessageBuilder";

export default class LastDeparturesMessageBuilder extends NavitiaMessageBuilder{

    getReplyFromNavitia(place, journeysResponse) {
        const lastDeparture = this.formatDatetime(journeysResponse.journeys[0].departure_date_time);
        const trainPicto = this.getPicto('physical_mode:Train');
        const destination = place.name;

        const replyMessage = `${trainPicto} Faudra pas se louper, le dernier départ vers ${destination} est à :clock5: ${lastDeparture}`;

        return this.getReply(replyMessage);
    }
}
