#!/bin/bash

if [ "${ENDPOINT:-UNDEF}" = "UNDEF" ]; then
    echo "Please define ENDPOINT"
    ENDPOINT=http://localhost:5000/home-debugger/us-central1
fi

URL=$ENDPOINT/homeAutomation

curl $URL -i -H "Content-Type: application/json" -H "Authorization: Bearer accesstoken1000" -X POST -d @- <<EOF
{
  "requestId": "ff36a3cc-ec34-11e6-b1a0-64510650abcf",
  "inputs": [{
    "intent": "action.devices.QUERY",
    "payload": {
      "devices": [{
        "id": "ID1",
        "customData": {
          "fooValue": 74,
          "barValue": true,
          "bazValue": "foo"
        }
      },{
        "id": "ID2",
        "customData": {
          "fooValue": 12,
          "barValue": false,
          "bazValue": "bar"
        }
      }]
    }
  }]
}
EOF
echo # for CR
