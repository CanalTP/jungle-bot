import R from 'ramda';

export default {
    getReply: function(messageBody, requesterMessage) {
        const reply = {
            '@context': 'https://www.w3.org/ns/activitystreams',
            'type': 'Create',
            'generator': {
                'id': R.path(['generator', 'id'], requesterMessage),
                'type': 'Service',
                'name': R.path(['generator', 'name'], requesterMessage)
            },
            'object': {
                'type': 'Note',
                'content': messageBody
            },
            'to': {
                'type': R.path(['target', 'type'], requesterMessage),
                'id': R.path(['target', 'id'], requesterMessage)
            }
        }

        return reply;
    }
}