function query(request, response) {
  var input = request.body.inputs[0];

  if (!input.payload || !input.payload.devices) {
    response.status(401).json({error: 'bad request'});
    return;
  }

  // var devices = body.payload.devices;
  // var payloadDevices = {};
  // for (let i = 0; i < devices.length; i++) {
  // }

  response.status(200).end();
}

exports.query = query;
