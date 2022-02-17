exports.handler = function (context, event, callback) {

    const twiml = new Twilio.twiml.VoiceResponse();

    twiml.gather({
        input: 'dtmf',
        action: '/twiml/dial'
    })


    callback(null, twiml)
}