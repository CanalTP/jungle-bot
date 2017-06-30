import IsochronMessageBuilder from "../lib/output/IsochronMessageBuilder";

export default {
    getIsochronAsciiArt: (message, origin, duration, hasIsochronCallback) => {
        const builder = new IsochronMessageBuilder(message);
        const reply = builder.getReply();
        hasIsochronCallback(reply);
    }
}
