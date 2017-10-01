const db = require('./database');

function sync(request, response) {
  var devices = db.devices;
  var res = {
    requestId: request.requestId,
    payload: {
      agentUserId: "1836.15267389",
      devices: devices,
    }
  };
  response.status(200).json(res);
}

exports.sync = sync;
