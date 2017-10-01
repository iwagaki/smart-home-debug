const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// TODO
// - How to handle JSON parse error?

exports.homeAutomation = functions.https.onRequest((request, response) => {
  var headers = request.headers;
  var body = request.body;
    
  console.log('post /homeAutomation', headers, body);

  if (!body.requestId) {
    response.status(401).json({error: 'missing requestId'});
    return;
  }

  if (!body.inputs) {
    response.status(401).json({error: 'missing inputs'});
    return;
  }

  var intent = body.inputs[0];

  console.log(request.method);
  console.log(intent);
  
  response.status(200).end();
});
