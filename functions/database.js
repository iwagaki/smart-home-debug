var users = {
  '1': {
    name: 'Taro',
  }
};


var devices = {
  '1': {
    'sync_info': {
      id: '123', // Required
      type: 'action.devices.types.LIGHT', // Required
      traits: [ // Required
        'action.devices.traits.OnOff'
      ],
      name: { // Required
        defaultNames: ['Virtual Light'], // Optional
        name: 'Light 1', // Optional
        // nicknames Optional
      },
      willReportState: true, // Required
      // roomHint Optional
      // structureHint Optional
      // deviceInfo Optional
      // attributes Optional
      // customData Optional
    },
    'query_info': {
      '123': {
        online: true,
        on: true,
        brightness: 100,
      }
    }
  }
};

exports.devices = devices;
exports.users = users;
