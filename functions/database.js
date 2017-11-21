const traitsObject = require('./traits');
const base = require('./base-device');

var devices = {};

{
  let device = Object.create(base.baseDevice);
  device.id = 'ID1';
  device.type = 'action.devices.types.LIGHT';
  device.name = 'Light 1';
  device.traits = [Object.create(traitsObject.onOff), Object.create(traitsObject.brightness)];
  devices[device.id] = device;
}

{
  let device = Object.create(base.baseDevice);
  device.id = 'ID2';
  device.type = 'action.devices.types.LIGHT';
  device.name = 'Light 2';
  device.traits = [Object.create(traitsObject.onOff)];
  devices[device.id] = device;
}

{
  let device = Object.create(base.baseDevice);
  device.id = 'ID3';
  device.type = 'action.devices.types.THERMOSTAT';
  device.name = 'Thermostat 1';
  device.traits = [Object.create(traitsObject.temperatureSetting)];
  devices[device.id] = device;
}

{
  let device = Object.create(base.baseDevice);
  device.id = 'ID4';
  device.type = 'action.devices.types.THERMOSTAT';
  device.name = 'Thermostat 2';
  device.traits = [Object.create(traitsObject.temperatureSetting)];
  devices[device.id] = device;
}

{
  let device = Object.create(base.baseDevice);
  device.id = 'ID5';
  device.type = 'action.devices.types.DRYER';
  device.name = 'Dryer 1';
  device.traits = [Object.create(traitsObject.toggles)];
  devices[device.id] = device;
}

exports.devices = devices;

