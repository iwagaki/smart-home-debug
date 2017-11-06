var users = {
  '1': {
    name: 'Taro',
  }
};



var brightnessTrait = {
  brightness: 100,

  execute: function(command) {
    if (command.command == 'action.devices.commands.BrightnessAbsolute') {
      if (!command.params.hasOwnProperty('brightness') || !(typeof command.params.brightness == 'number') || !(command.params.brightness >= 0 && command.params.brightness <= 100)) {
        console.log('Bad request'); // TODO
        return;
      }
      this.brightness = command.params.brightness;
    }
  },

  query: function(request) {
    return { brightness: this.brightness };
  },

  getTraitName: function() {
    return 'action.devices.traits.Brightness';
  }
};

var onOffTrait = {
  on: true,

  execute: function(command) {
    if (command.command == 'action.devices.commands.OnOff') {
      if (!command.params.hasOwnProperty('on') || !(typeof command.params.on == 'boolean')) {
        console.log('Bad request'); // TODO
        return;
      }
      this.on = command.params.on;
    }
  },

  query: function() {
    return { on: this.on };
  },

  getTraitName: function() {
    return 'action.devices.traits.OnOff';
  }
};


var baseDevice = {
  id: '',
  type: '',
  name: '',
  willReportState: true,
  online: true,
  traits: [],
  getSyncData: function() {
    var traitsArray = []
    for (var i = 0; i < this.traits.length; i++)
      traitsArray.push(this.traits[i].getTraitName());

    var responseData = {
      id: this.id, // Required
      type: this.type, // Required
      traits: traitsArray, // Required
      name: { // Required
        name: this.name // Optional
        // defaultNames // Optional
        // nicknames // Optional
      },
      willReportState: true, // Required
      // roomHint Optional
      // structureHint Optional
      // deviceInfo Optional
      // attributes Optional
      // customData Optional
    };

    return responseData;
  },
  getQueryData: function() {
    var responseData = {}
    responseData[this.id] = {online: this.online};

    for (var i = 0; i < this.traits.length; i++)
      Object.assign(responseData[this.id], this.traits[i].query());

    return responseData;
  },
  execute: function(command) {
    for (var i = 0; i < this.traits.length; i++)
      this.traits[i].execute(command);
  }
};


var devices = {}

devices['ID1'] = Object.create(baseDevice);
devices['ID1'].id = 'ID1';
devices['ID1'].type = 'action.devices.types.LIGHT';
devices['ID1'].name = 'Light 1';
devices['ID1'].traits = [ Object.create(onOffTrait), Object.create(brightnessTrait) ];

devices['ID2'] = Object.create(baseDevice);
devices['ID2'].id = 'ID2';
devices['ID2'].type = 'action.devices.types.LIGHT';
devices['ID2'].name = 'Light 2';
devices['ID2'].traits = [ Object.create(onOffTrait) ];



var deviceManager = {
  getSyncDevicesArray : function() {
    var devicesArray = [];
    for (var key in devices) {
      devicesArray.push(devices[key].getSyncData());
    }
    return devicesArray;
  },
  getQueryDevicesDict : function(devicesArray) {
    var devicesDict = {};
    for (var i = 0; i < devicesArray.length; i++) {
      if (devicesArray[i].id in devices)
        Object.assign(devicesDict, devices[devicesArray[i].id].getQueryData());
      else
        console.log('Bad ID') // TODO
    }
    return devicesDict;
  },
  getExecuteCommandsArray : function(commandsArray) {
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
  }
}

exports.deviceManager = deviceManager;
exports.users = users;
