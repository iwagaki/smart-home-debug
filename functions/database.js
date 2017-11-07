const traitsObject = require('./traits');
const base = require('./base-device');

var devices = {};

devices['ID1'] = Object.create(base.baseDevice);
devices['ID1'].id = 'ID1';
devices['ID1'].type = 'action.devices.types.LIGHT';
devices['ID1'].name = 'Light 1';
devices['ID1'].traits = [ Object.create(traitsObject.onOff), Object.create(traitsObject.brightness) ];

devices['ID2'] = Object.create(base.baseDevice);
devices['ID2'].id = 'ID2';
devices['ID2'].type = 'action.devices.types.LIGHT';
devices['ID2'].name = 'Light 2';
devices['ID2'].traits = [ Object.create(traitsObject.onOff) ];


exports.devices = devices;

