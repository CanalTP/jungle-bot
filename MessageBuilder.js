module.exports = {
    getReply: function(messageBody, target, generator) {
        const reply = {
            '@context': 'https://www.w3.org/ns/activitystreams',
            'type': 'Create',
            'generator': {
                'id': 'f6e92eb6-f69e-4eae-8158-06613461cf3a',
                'type': 'Service',
                'name': generator.name
            },
            'object': {
                'type': 'Note',
                'content': messageBody
            },
            'to': {
                'type': 'Group',
                'id': target.id
            }
        }

        return reply;
    }
}