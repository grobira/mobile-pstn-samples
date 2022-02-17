const { SYNC_SERVICE, SYNC_MAP } = process.env;

exports.handler = async function (context, event, callback) {

    const { salesRepNumber, customerNumber } = event;

    const response = new Twilio.Response();
    response.appendHeader('Access-Control-Allow-Origin', '*');
    response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
    response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.appendHeader('Content-Type', 'application/json');

    response.setBody({ map: "mapping" })

    const client = context.getTwilioClient();

    const mapCalls = await client.sync
        .services(SYNC_SERVICE)
        .syncMaps(SYNC_MAP)
        .syncMapItems
        .create({
            key: salesRepNumber,
            data: {
                destiny: customerNumber
            },
            ttl: 500
        });

    console.log(mapCalls)


    callback(null, response);

}