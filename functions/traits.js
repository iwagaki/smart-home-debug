var brightnessTrait = {
  data: {
    brightness: 100,
  },

  execute: function (command) {
    if (command.command == 'action.devices.commands.BrightnessAbsolute') {
      if (command.params.hasOwnProperty('brightness') && typeof command.params.brightness == 'number' &&
        command.params.brightness >= 0 && command.params.brightness <= 100) {
        this.data.brightness = command.params.brightness;
      } else {
        console.log('Bad request'); // TODO
        return;
      }
    }
  },

  query: function (request) {
    return { brightness: this.data.brightness };
  },

  getTraitName: function () {
    return 'action.devices.traits.Brightness';
  },

  getAttributes: function () {
    return {};
  },

  getData: function () {
    return this.data;
  },

  setData: function (data) {
    this.data = data;
  }

};


var onOffTrait = {
  data: {
    on: true,
  },

  execute: function (command) {
    if (command.command == 'action.devices.commands.OnOff') {
      if (command.params.hasOwnProperty('on') && typeof command.params.on == 'boolean') {
        this.data.on = command.params.on;
      } else {
        console.log('Bad request'); // TODO
        return;
      }
    }
  },

  query: function () {
    return { on: this.data.on };
  },

  getTraitName: function () {
    return 'action.devices.traits.OnOff';
  },

  getAttributes: function () {
    return {};
  },

  getData: function () {
    return this.data;
  },

  setData: function (data) {
    this.data = data;
  }
};


var TemperatureSettingTrait = {
  data: {
    thermostatMode: 'off',
    thermostatTemperatureSetpoint: 25.0,
    thermostatTemperatureAmbient: 25.0,
    thermostatHumidityAmbient: 45.0,
  },

  execute: function (command) {
    if (command.command == 'action.devices.commands.ThermostatTemperatureSetpoint') {
      if (command.params.hasOwnProperty('thermostatTemperatureSetpoint') && typeof command.params.thermostatTemperatureSetpoint == 'number') {
        this.data.thermostatTemperatureSetpoint = command.params.thermostatTemperatureSetpoint;
      } else {
        console.log('Bad request'); // TODO
        return;
      }
    }
    if (command.command == 'action.devices.commands.ThermostatTemperatureSetRange') {
      if (command.params.hasOwnProperty('thermostatTemperatureSetpointHigh') && typeof command.params.thermostatTemperatureSetpointHigh == 'number') {
        this.data.thermostatTemperatureSetpointHigh = command.params.thermostatTemperatureSetpointHigh;
      } else {
        console.log('Bad request'); // TODO
        return;
      }
      if (command.params.hasOwnProperty('thermostatTemperatureSetpointLow') && typeof command.params.thermostatTemperatureSetpointHigh == 'number') {
        this.data.thermostatTemperatureSetpointLow = command.params.thermostatTemperatureSetpointLow;
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
      thermostatMode: this.data.thermostatMode,
      thermostatTemperatureSetpoint: this.data.thermostatTemperatureSetpoint,
      thermostatTemperatureAmbient: this.data.thermostatTemperatureAmbient,
      thermostatHumidityAmbient: this.data.thermostatHumidityAmbient
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
  },

  getData: function () {
    return this.data;
  },

  setData: function (data) {
    this.data = data;
  }
};


var togglesTrait = {
  data: {
    mode_cool: true
  },

  execute: function (command) {
    if (command.command == 'action.devices.commands.SetToggles') {
      if (command.params.hasOwnProperty('updateToggleSettings') && typeof command.params.updateToggleSettings == 'object' &&
        command.params.updateToggleSettings.hasOwnProperty('cool')) {
        this.data.mode_cool = this.command.params.updateToggleSettings.cool;
      } else {
        console.log('Bad request'); // TODO
        return;
      }
    }
  },

  query: function (request) {
    return {
      currentToggleSettings: [{
        cool: this.data.mode_cool,
        lang: 'en'
      }]
    };
  },

  getTraitName: function () {
    return 'action.devices.traits.Toggles';
  },

  getAttributes: function () {
    return {
      availableToggles: [{
        name: 'cool',
        name_values: [{
          name_synonym: ['cool', 'power cool'],
          lang: 'en'
        }]
      }]
    };
  },

  getData: function () {
    return this.data;
  },

  setData: function (data) {
    this.data = data;
  }
};


exports.onOff = onOffTrait;
exports.brightness = brightnessTrait;
exports.temperatureSetting = TemperatureSettingTrait;
exports.toggles = togglesTrait;
