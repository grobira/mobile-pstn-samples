const { SYNC_SERVICE, SYNC_MAP } = process.env;

exports.handler = async function (context, event, callback) {

    const { From } = event;

    const client = context.getTwilioClient();

    const mapCalls = await client.sync
        .services(SYNC_SERVICE)
        .syncMaps(SYNC_MAP)
        .syncMapItems(From.replace('+', ''))
        .fetch();


    const customerNumber = mapCalls.data.destiny;

    const twiml = new Twilio.twiml.VoiceResponse();

    twiml.dial(customerNumber)

    callback(null, twiml);

}