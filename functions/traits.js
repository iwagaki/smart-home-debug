var brightnessTrait = {
  brightness: 100,

  execute: function (command) {
    if (command.command == 'action.devices.commands.BrightnessAbsolute') {
      if (command.params.hasOwnProperty('brightness') && typeof command.params.brightness == 'number' &&
        command.params.brightness >= 0 && command.params.brightness <= 100) {
        this.brightness = command.params.brightness;
      } else {
        console.log('Bad request'); // TODO
        return;
      }
    }
  },

  query: function (request) {
    return { brightness: this.brightness };
  },

  getTraitName: function () {
    return 'action.devices.traits.Brightness';
  },

  getAttributes: function () {
    return {};
  }

};


var onOffTrait = {
  on: true,

  execute: function (command) {
    if (command.command == 'action.devices.commands.OnOff') {
      if (command.params.hasOwnProperty('on') && typeof command.params.on == 'boolean') {
        this.on = command.params.on;
      } else {
        console.log('Bad request'); // TODO
        return;
      }
    }
  },

  query: function () {
    return { on: this.on };
  },

  getTraitName: function () {
    return 'action.devices.traits.OnOff';
  },

  getAttributes: function () {
    return {};
  }
};


var TemperatureSettingTrait = {
  thermostatMode: 'off',
  thermostatTemperatureSetpoint: 25.0,
  thermostatTemperatureAmbient: 25.0,
  thermostatHumidityAmbient: 45.0,

  execute: function (command) {
    if (command.command == 'action.devices.commands.ThermostatTemperatureSetpoint') {
      if (command.params.hasOwnProperty('thermostatTemperatureSetpoint') && typeof command.params.thermostatTemperatureSetpoint == 'number') {
        this.thermostatTemperatureSetpoint = command.params.thermostatTemperatureSetpoint;
      } else {
        console.log('Bad request'); // TODO
        return;
      }
    }
    if (command.command == 'action.devices.commands.ThermostatTemperatureSetRange') {
      if (command.params.hasOwnProperty('thermostatTemperatureSetpointHigh') && typeof command.params.thermostatTemperatureSetpointHigh == 'number') {
        this.thermostatTemperatureSetpointHigh = command.params.thermostatTemperatureSetpointHigh;
      } else {
        console.log('Bad request'); // TODO
        return;
      }
      if (command.params.hasOwnProperty('thermostatTemperatureSetpointLow') && typeof command.params.thermostatTemperatureSetpointHigh == 'number') {
        this.thermostatTemperatureSetpointLow = command.params.thermostatTemperatureSetpointLow;
      } else {
        console.log('Bad request'); // TODO
        return;
      }
    }
    if (command.command == 'action.devices.commands.ThermostatSetMode') {
      if (command.params.hasOwnProperty('thermostatMode') && typeof command.params.thermostatMode == 'string' &&
        ['cool', 'heat', 'off', 'heatcool'].indexOf(command.params.thermostatMode) != -1) {
        this.thermostatMode = command.params.thermostatMode;
      } else {
        console.log('Bad request'); // TODO
        return;
      }
    }
  },

  query: function () {
    return {
      thermostatMode: this.thermostatMode,
      thermostatTemperatureSetpoint: this.thermostatTemperatureSetpoint,
      thermostatTemperatureAmbient: this.thermostatTemperatureAmbient,
      thermostatHumidityAmbient: this.thermostatHumidityAmbient
    };
  },

  getTraitName: function () {
    return 'action.devices.traits.TemperatureSetting';
  },

  getAttributes: function () {
    return {
      availableThermostatModes: 'off,heat,cool,on',
      thermostatTemperatureUnit: 'C'
    };
  }
};


exports.onOff = onOffTrait;
exports.brightness = brightnessTrait;
exports.temperatureSetting = TemperatureSettingTrait;
