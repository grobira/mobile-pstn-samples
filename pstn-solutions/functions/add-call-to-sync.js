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
        .services('IS87b3ed140b2a81999b3b8033487881f9')
        .syncMaps('MP1611f592d0bf4e6ab5050b4da14df05a')
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