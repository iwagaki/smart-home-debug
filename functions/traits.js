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
    return this.data;
  },

  getTraitName: function () {
    return 'action.devices.traits.Brightness';
  },

  getAttributes: function () {
    return {};
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
    return this.data;
  },

  getTraitName: function () {
    return 'action.devices.traits.OnOff';
  },

  getAttributes: function () {
    return {};
  }
};


var colorSpectrumTrait = {
  data: {
    spectrumRGB: 16777215,
  },

  execute: function (command) {
    if (command.command == 'action.devices.commands.ColorAbsolute') {
      if (command.params.hasOwnProperty('spectrumRGB') && typeof command.params.spectrumRGB == 'number' &&
        command.params.spectrumRGB >= 0 && command.params.spectrumRGB <= 16777215) {
        this.data.spectrumRGB = command.params.spectrumRGB;
      } else {
        console.log('Bad request'); // TODO
        return;
      }
    }
  },

  query: function (request) {
    return this.data;
  },

  getTraitName: function () {
    return 'action.devices.traits.ColorSpectrum';
  },

  getAttributes: function () {
    return {};
  }
};


var TemperatureSettingTrait = {
  data: {
    thermostatMode: 'off',
    thermostatTemperatureSetpoint: 25.0,
    thermostatTemperatureAmbient: 25.0,
    thermostatHumidityAmbient: 45.0,
    lastThermostatMode: 'heatcool'
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
        ['cool', 'heat', 'on', 'off', 'heatcool'].indexOf(command.params.thermostatMode) != -1) {
        let targetMode = command.params.thermostatMode;
        if (targetMode == 'on') {
          targetMode = this.data.lastThermostatMode;
        } else if (targetMode == 'off') {
          this.data.lastThermostatMode = this.data.thermostatMode;
        }
        this.data.thermostatMode = targetMode;
      } else {
        console.log('Bad request'); // TODO
        return;
      }
    }
  },

  query: function () {
    return this.data;
  },

  getTraitName: function () {
    return 'action.devices.traits.TemperatureSetting';
  },

  getAttributes: function () {
    return {
      availableThermostatModes: 'off,heat,cool,on,heatcool',
      thermostatTemperatureUnit: 'C'
    };
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
  }
};


exports.onOff = onOffTrait;
exports.brightness = brightnessTrait;
exports.colorSpectrum = colorSpectrumTrait;
exports.temperatureSetting = TemperatureSettingTrait;
exports.toggles = togglesTrait;
