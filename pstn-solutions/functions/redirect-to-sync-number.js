const { SYNC_SERVICE } = process.env;

exports.handler = async function (context, event, callback) {

    const { From, CallSid } = event;

    const response = new Twilio.Response();
    response.appendHeader('Access-Control-Allow-Origin', '*');
    response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
    response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.appendHeader('Content-Type', 'application/json');

    const client = context.getTwilioClient();

    const mapCalls = await client.sync
        .services(SYNC_SERVICE)
        .syncMaps('MP1611f592d0bf4e6ab5050b4da14df05a')
        .syncMapItems(From.replace('+', ''))
        .fetch();


    const customerNumber = mapCalls.data.destiny;

    const twiml = new Twilio.twiml.VoiceResponse();

    twiml.dial(customerNumber)

    response.setBody({ status: "redirecting" })


    callback(null, twiml);

}