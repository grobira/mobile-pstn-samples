const { TWILIO_NUMBER, DOMAIN } = process.env;


exports.handler = async function (context, event, callback) {

  const client = context.getTwilioClient();

  const { salesRepNumber, clientNumber } = event;

  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
  response.appendHeader('Content-Type', 'application/json');

  try {
    const call = await client.calls.create(
      {
        url: `https://${DOMAIN}/twiml/dial?Digits=${clientNumber}`,
        to: salesRepNumber,
        from: TWILIO_NUMBER
      }
    )

    response.setBody({ status: "calling" })

  } catch (e) {
    console.log(e)
    response.setBody({ status: "error", errorDetails: e })
  }

  callback(null, response);
};
