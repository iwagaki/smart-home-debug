#!/bin/bash

if [ "${END_POINT:-UNDEF}" = "UNDEF" ]; then
    echo "Please define END_POINT"
    exit
fi

URL=$END_POINT/homeAutomation

curl $URL -D - -H "Content-Type: application/json" -X POST -d @- <<EOF
{
  "requestId": "ff36a3cc-ec34-11e6-b1a0-64510650abcf",
  "inputs": [{
    "intent": "action.devices.SYNC"
  }]
}
EOF
