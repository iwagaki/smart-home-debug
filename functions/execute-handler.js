const devices = require('./devices');

var deviceManager = devices.deviceManager;

function execute(request, response) {
  var input = request.body.inputs[0];

  if (!input.hasOwnProperty('payload') || !input.payload.hasOwnProperty('commands') || !Array.isArray(input.payload.commands)) {
    response.status(401).json({error: 'bad request'});
    return;
  }

  var commandsArray = deviceManager.getExecuteCommandsArray(input.payload.commands);

  var responseData = {
    requestId: request.requestId,
    payload: {
      // errorCode
      // debugString
      commands: commandsArray,
    }
  };
  response.status(200).json(responseData);
}

exports.execute = execute;
