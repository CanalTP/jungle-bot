import MessageBuilder from "./MessageBuilder";

export default class NavitiaMessageBuilder extends MessageBuilder{
    formatDatetime(datetime) {
        if (typeof datetime !== 'string') { return 'none'; }
        var formated = datetime.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/,
            '$4:$5');
        return formated;
    };

    getPicto(physical_mode) {
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
}
