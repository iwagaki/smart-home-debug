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


exports.onOff = onOffTrait;
exports.brightness = brightnessTrait;
