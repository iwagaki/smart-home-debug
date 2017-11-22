const functions = require('firebase-functions');
const util = require('util');
const express = require('express');

const syncHandler = require('./sync-handler');
const queryHandler = require('./query-handler');
const executeHandler = require('./execute-handler');

const tokenManagerInstance = require('./token-manager');
const tokenManager = tokenManagerInstance.tokenManager;

const deviceManagerInstance = require('./device-manager');
const deviceManager = deviceManagerInstance.deviceManager;


var app = express();

function getUid(request) {
  if (request.headers.authorization) {
    let authorization_strings = request.headers.authorization.split(' ');
    if (authorization_strings[0].toLowerCase() == 'bearer') {
      if (authorization_strings[1] == tokenManager.getAccessToken()) // TODO
        return '1234'; // TODO
    }
  }

  console.log('Bad access token: ' + tokenManager.getAccessToken());

  return null;
}

// Home automation endpoint
app.post('/', (request, response) => {
  tokenManager.getFuncToGetPromiseToLoad()()
    .then(deviceManager.getFuncToGetPromiseToLoad())
    .then(() => {
      var headers = request.headers;
      var body = request.body;

      console.log(request.method, headers);
      console.log(JSON.stringify(body));

      if (!getUid(request)) {
        response.status(401).json({ error: 'bad authorization' });
        return;
      }

      if (!body.hasOwnProperty('requestId') ||
        !(typeof body.requestId == 'string') ||
        !body.hasOwnProperty('inputs') ||
        !Array.isArray(body.inputs) ||
        !body.inputs.length == 1) {
        response.status(401).json({ error: 'bad request' });
        return;
      }

      var intent = body.inputs[0].intent;
      console.log(intent);

      switch (intent) {
        case "action.devices.SYNC":
          syncHandler.sync(body, response);
          break;
        case "action.devices.QUERY":
          queryHandler.query(body, response);
          break;
        case "action.devices.EXECUTE":
          executeHandler.execute(body, response);
          break;
        default:
          response.status(401).json({ error: 'bad intent' });
      }
    })
    .then(deviceManager.getFuncToGetPromiseToUpdate())
    .then(tokenManager.getFuncToGetPromiseToUpdate());
});

// oauth2 Authentication endpoint
app.all('/auth', (request, response) => {
  tokenManager.getFuncToGetPromiseToLoad()()
    .then(() => {
      var headers = request.headers;
      var body = request.body;

      var response_type = request.query.response_type;
      var client_id = request.query.client_id;
      var redirect_uri = request.query.redirect_uri;
      var state = request.query.state;

      console.log(request.method, headers, body);

      if (response_type != 'code' ||
        client_id != 'clientid1234') { // TODO
        response.status(401).json({ error: 'invalid_client' });
        return;
      }

      tokenManager.updateAuthToken();

      response.redirect(util.format('%s?code=%s&state=%s',
        redirect_uri,
        tokenManager.getAuthToken(),
        state
      ))
    })
    .then(tokenManager.getFuncToGetPromiseToUpdate());
});


// oauth2 Token endpoint
app.post('/token', (request, response) => {
  tokenManager.getFuncToGetPromiseToLoad()()
    .then(() => {
      var headers = request.headers;
      var body = request.body;

      var client_id = request.query.client_id ? request.query.client_id : request.body.client_id;
      var client_secret = request.query.client_secret ? request.query.client_secret : request.body.client_secret;
      var grant_type = request.query.grant_type ? request.query.grant_type : request.body.grant_type;

      console.log(request.method, headers, body);

      if (client_id != 'clientid1234' || // TODO
        client_secret != 'clientsecret1234') { // TODO
        response.status(400).json({ error: 'invalid_client' });
      }

      if (['authorization_code', 'refresh_token'].indexOf(grant_type) == -1) {
        response.status(400).json({ error: 'invalid_request' });
        return;
      }

      if (grant_type == 'refresh_token') {
        var refreshToken = request.query.refresh_token ? request.query.refresh_token : request.body.refresh_token;
        if (refreshToken != tokenManager.getRefreshToken()) {
          console.log('Bad refresh token: expected:' + tokenManager.getRefreshToken() + ' refresh_token: ' + refreshToken);
          response.status(400).json({ error: 'invalid_grant' });
          return;
        }
        console.log('*** refresh token ***');
      } else if (grant_type == 'authorization_code') {
        var code = request.query.code ? request.query.code : request.body.code;
        if (code != tokenManager.getAuthToken()) {
          console.log('Bad auth token: expected:' + tokenManager.getAuthToken() + ' code: ' + code);
          response.status(400).json({ error: 'invalid_grant' });
          return;
        }
        console.log('*** auth token ***');
      }

      tokenManager.updateAccessToken();
      tokenManager.updateRefreshToken();
      var newAccessToken = tokenManager.getAccessToken();
      var newRefreshToken = tokenManager.getRefreshToken();

      var responseData = {
        token_type: 'bearer', // Required
        access_token: newAccessToken, // Required // TODO
        refresh_token: newRefreshToken, // Required // TODO
        expires_in: 3600 // Optional (sec) // TODO
      };

      console.log(responseData);
      response.status(200).json(responseData);
    })
    .then(tokenManager.getFuncToGetPromiseToUpdate());
});

exports.homeAutomation = functions.https.onRequest(app);
