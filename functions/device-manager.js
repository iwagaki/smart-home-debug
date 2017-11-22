const realtimeDatabaseInstance = require('./realtime-database');
const realtimeDatabase = realtimeDatabaseInstance.realtimeDatabase;

const deviceListInstance = require('./device-list');
const devices = deviceListInstance.devices;

var deviceManager = {
  getSyncDevicesArray: function () {
    var devicesArray = [];
    for (var key in devices) {
      devicesArray.push(devices[key].getSyncData());
    }
    return devicesArray;
  },

  getQueryDevicesDict: function (devicesArray) {
    var devicesDict = {};
    for (var i = 0; i < devicesArray.length; i++) {
      if (devicesArray[i].id in devices)
        Object.assign(devicesDict, devices[devicesArray[i].id].getQueryData());
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
        if (executionDevices[j].id in devices) {
          updateDevices[executionDevices[j].id] = 1;

          for (var k = 0; k < executionCommands.length; k++) {
            var command = executionCommands[k];

            if (!command.hasOwnProperty('command') || !command.hasOwnProperty('params')) {
              console.log('Bad request'); // TODO
              continue;
            }

            devices[executionDevices[j].id].execute(command);
          }
        } else {
          console.log('Bad ID') // TODO
        }
      }
    }

    var responseArray = [];
    for (key in updateDevices) {
      var dict1 = devices[key].getQueryData();
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

  getFuncToGetPromiseToLoad: function () {
    var obj = { data: {} };
    return function () {
      return realtimeDatabase.loadDatabase('devices', obj).then(() => {
        for (var key in devices) {
          devices[key].setData(obj.data[key]);
        }
      });
    };
  },

  getFuncToGetPromiseToUpdate: function () {
    return function () {
      var obj = {
        data: {}
      };

      for (var key in devices) {
        obj.data[key] = devices[key].getData();
      }

      return realtimeDatabase.updateDatabase('devices', obj);
    };
  }
};

// Initialize 'devices' data if the database doesn't have the key
realtimeDatabase.hasChildPromise('devices')
  .catch(deviceManager.getFuncToGetPromiseToUpdate());

exports.deviceManager = deviceManager;
