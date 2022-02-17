

exports.handler = function (context, event, callback) {

    const { Digits } = event;

    const twiml = new Twilio.twiml.VoiceResponse();

    twiml.dial(Digits)


    callback(null, twiml)
}