const db = require('./database');

var deviceManager = db.deviceManager;
var users = db.users;

function query(request, response) {
  var input = request.body.inputs[0];

  if (!input.hasOwnProperty('payload') || !input.payload.hasOwnProperty('devices') || !Array.isArray(input.payload.devices)) {
    response.status(401).json({error: 'bad request'});
    return;
  }

  var devicesDict = deviceManager.getQueryDevicesDict(input.payload.devices);

  var responseData = {
    requestId: request.requestId,
    payload: {
      // errorCode
      // debugString
      devices: devicesDict,
    }
  };
  response.status(200).json(responseData);
}

exports.query = query;
