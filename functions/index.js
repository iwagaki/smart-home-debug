const functions = require('firebase-functions');
const util = require('util');
const syncHandler = require('./sync-handler');
const queryHandler = require('./query-handler');
const executeHandler = require('./execute-handler');

// TODO
// - How to handle a JSON parse error?

function getUid(request) {
  if (request.headers.authorization) {
    let authorization_strings = request.headers.authorization.split(' ');
    if (authorization_strings[0].toLowerCase() == 'bearer') {
      if (authorization_strings[1] == 'accesstoken1234') // TODO
        return '1234';
    }
  }

  return null;
}

// Home automation endpoint
exports.homeAutomation = functions.https.onRequest((request, response) => {
  var headers = request.headers;
  var body = request.body;

  console.log(request.method, headers, body);

  if (!getUid(request)) {
    response.status(401).json({ error: 'bad authorization' });
    return;
  }

  if (!body.requestId ||
    !body.inputs ||
    !body.inputs.length == 1) {
    response.status(401).json({ error: 'bad request' });
    return;
  }

  var intent = body.inputs[0].intent;
  console.log(intent);

  switch (intent) {
    case "action.devices.SYNC":
      syncHandler.sync(request, response);
      break;
    case "action.devices.QUERY":
      queryHandler.query(request, response);
      break;
    case "action.devices.EXECUTE":
      executeHandler.execute(request, response);
      break;
    default:
      response.status(401).json({ error: 'bad intent' });
  }
});

// device management endpoint
//   - addDevice
//   - updateDevice
//   - deleteDevice
//   - showDevices
exports.updateDevices = functions.https.onRequest((request, response) => {
});

// oauth2 Authentication endpoint
exports.oauth2Autherize = functions.https.onRequest((request, response) => {
  var headers = request.headers;
  var body = request.body;

  var response_type = request.query.response_type;
  var client_id = request.query.client_id;
  var redirect_uri = request.query.redirect_uri;
  var state = request.query.state;

  console.log(request.method, headers, body);

  if (response_type != 'code' ||
    client_id != 'clientid1234') {
    response.status(401).json({ error: 'Bad query' });
    return;
  }

  var auth_code = "authtoken1234"; // TODO
  response.redirect(util.format('%s?code=%s&state=%s',
    redirect_uri,
    auth_code,
    state
  ));
});

// oauth2 Token endpoint
exports.oauth2Token = functions.https.onRequest((request, response) => {
  var headers = request.headers;
  var body = request.body;

  var client_id = request.query.client_id ? request.query.client_id : request.body.client_id;
  var client_secret = request.query.client_secret ? request.query.client_secret : request.body.client_secret;
  var grant_type = request.query.grant_type ? request.query.grant_type : request.body.grant_type;

  console.log(request.method, headers, body);

  if (client_id != 'clientid1234' ||
    client_secret != 'clientsecret1234' ||
    ['authorization_code', 'refresh_token'].indexOf(grant_type) == -1) {
    response.status(401).json({ error: 'bad header' });
    return;
  }

  var responseData = {
    token_type: 'bearer', // Required
    access_token: 'accesstoken1234', // Required
    refresh_token: 'authtoken1234', // Required
    expires_in: 60 // Optional (sec)
  };

  response.status(200).json(responseData);
});
