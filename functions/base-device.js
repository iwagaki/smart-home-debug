var baseDevice = {
  id: '',
  type: '',
  name: '',
  willReportState: true,
  online: true,
  traits: [],
  getSyncData: function () {
    var traitsArray = []
    for (var i = 0; i < this.traits.length; i++)
      traitsArray.push(this.traits[i].getTraitName());

    var attributes = {}
    for (var i = 0; i < this.traits.length; i++)
      Object.assign(attributes, this.traits[i].getAttributes());

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
      attributes: attributes, // attributes Optional
      // customData Optional
    };

    return responseData;
  },
  getQueryData: function () {
    var responseData = {}
    responseData[this.id] = { online: this.online };

    for (var i = 0; i < this.traits.length; i++)
      Object.assign(responseData[this.id], this.traits[i].query());

    return responseData;
  },
  execute: function (command) {
    for (var i = 0; i < this.traits.length; i++)
      this.traits[i].execute(command);
  },

  getData: function () {
    var dataArray = [];
    for (var i = 0; i < this.traits.length; i++)
      dataArray.push(this.traits[i].getData());

    return dataArray;
  },

  setData: function (dataArray) {
    if (dataArray.length == this.traits.length)
      for (var i = 0; i < this.traits.length; i++)
        this.traits[i].setData(dataArray[i]);
  }
};

exports.baseDevice = baseDevice;
