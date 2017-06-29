module.exports = {
    getActor: function(message) {
        return message.actor;
    },
    getTarget: function(message) {
        return message.target;
    },
    getGenerator: function(message) {
        return message.generator;
    }
}