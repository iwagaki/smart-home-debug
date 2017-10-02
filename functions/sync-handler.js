const db = require('./database');

var devices = db.devices;
var users = db.users;

function sync(request, response) {
  var agentUserId = '1';
  var deviceArray = [];

  for (let key in devices)
    deviceArray.push(devices[key]);

  var responseData = {
    requestId: request.requestId,
    payload: {
      agentUserId: agentUserId,
      devices: deviceArray,
    }
  };
  response.status(200).json(responseData);
}

exports.sync = sync;
