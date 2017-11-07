const devices = require('./devices');

var deviceManager = devices.deviceManager;

function sync(request, response) {
  var agentUserId = '1'; // TODO: should be an unique hash number for each user
  var devicesArray = deviceManager.getSyncDevicesArray();

  var responseData = {
    requestId: request.requestId,
    payload: {
      // errorCode
      // debugString
      agentUserId: agentUserId, // Requid for REQUEST_SYNC
      devices: devicesArray,
    }
  };
  response.status(200).json(responseData);
}

exports.sync = sync;
