import R from 'ramda';

export default class MessageBuilder {
    constructor(requesterMessage) {
        this.requesterMessage = requesterMessage;
    }

    getReply(messageBody) {
        const toType = R.path(['target', 'type'], this.requesterMessage);
        if (toType == 'Group') {
            messageBody = `${R.path(['actor', 'name'], this.requesterMessage)}, ${messageBody}`;
        }

        const reply = {
            '@context': 'https://www.w3.org/ns/activitystreams',
            'type': 'Create',
            'generator': {
                'id': R.path(['generator', 'id'], this.requesterMessage),
                'type': 'Service',
                'name': R.path(['generator', 'name'], this.requesterMessage)
            },
            'object': {
                'type': 'Note',
                'content': messageBody
            },
            'to': {
                'type': toType,
                'id': R.path(['target', 'id'], this.requesterMessage)
            }
        };

        return reply;
    }
}
