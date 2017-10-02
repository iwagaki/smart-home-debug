var users = {
  '1': {
    name: 'Taro',
  }
};


var devices = {
  '1': {
    id: "123",
    type: "action.devices.types.LIGHT",
    traits: [
      "action.devices.traits.OnOff"
    ],
    name: {
      defaultNames: ["Virtual Light"],
      name: "Light 1",
      // nicknames: optional
    },
    willReportState: true,
    // deviceInfo: optional
    // attributes: optional
    // customData: optional
  }
};

exports.devices = devices;
exports.users = users;
