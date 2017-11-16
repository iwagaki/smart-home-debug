const db = require('./database');

// const admin = require('firebase-admin');
// const serviceAccount = require('./home-debugger-a13a19250360.json');


// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://home-debugger-c86f2.firebaseio.com/'
// });

var deviceManager = {
  getSyncDevicesArray: function () {
    var devicesArray = [];
    for (var key in db.devices) {
      devicesArray.push(db.devices[key].getSyncData());
    }
    return devicesArray;
  },
  getQueryDevicesDict: function (devicesArray) {
    var devicesDict = {};
    for (var i = 0; i < devicesArray.length; i++) {
      if (devicesArray[i].id in db.devices)
        Object.assign(devicesDict, db.devices[devicesArray[i].id].getQueryData());
      else
        console.log('Bad ID') // TODO
    }
    return devicesDict;
  },
  getExecuteCommandsArray: function (commandsArray) {
    var updateDevices = {};

    for (var i = 0; i < commandsArray.length; i++) {
      var command = commandsArray[i];

      if (!command.hasOwnProperty('devices') || !Array.isArray(command.devices || !command.hasOwnProperty('execution') || !Array.isArray(command.execution))) {
        console.log('Bad request'); // TODO
        continue;
      }

      console.log(JSON.stringify(command));

      var executionDevices = command.devices;
      var executionCommands = command.execution;

      for (var j = 0; j < executionDevices.length; j++) {
        if (executionDevices[j].id in db.devices) {
          updateDevices[executionDevices[j].id] = 1;

          for (var k = 0; k < executionCommands.length; k++) {
            var command = executionCommands[k];

            if (!command.hasOwnProperty('command') || !command.hasOwnProperty('params')) {
              console.log('Bad request'); // TODO
              continue;
            }

            db.devices[executionDevices[j].id].execute(command);
          }
        } else {
          console.log('Bad ID') // TODO
        }
      }
    }

    var responseArray = [];
    for (key in updateDevices) {
      var dict1 = db.devices[key].getQueryData();
      var key = Object.keys(dict1)[0];
      var responseData = {
        ids: [key],
        status: 'SUCCESS', // TODO
        states: dict1[key]
      }
      responseArray.push(responseData);
    }
    return responseArray;
  },

  loadDatabase: function () {
    // admin.database().ref("/devices").once("value")
    //   .then(snapshot => {
    //     database = snapshot.val();

    //   }).catch(error => {
    //     console.log("Can't access to database", error);
    //   });
  },

  updateDatabase: function () {
    const ref = admin.database().ref('/users');

    var databaseData = {};

    for (var key in db.devices)
      databaseData[key] = db.devices[key].getData();

    // ref.set(databaseData, error => {
    //   if (error) {
    //     console.log("devices: save error", error.message);
    //   } else {
    //     console.log('devices: save success' + databaseData);
    //   }
    // });
  }
};

exports.deviceManager = deviceManager;
