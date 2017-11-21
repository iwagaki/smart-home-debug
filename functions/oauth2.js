const db = require('./realtime-database');

var tokenManager = {
  data: {
    authTokenCount: 1000,
    accessTokenCount: 1000,
    refreshTokenCount: 1000
  },

  getFuncToGetPromiseToLoad: function () {
    var self = this;
    return function () {
      return db.realtimeDatabase.loadDatabase('users', self);
    };
  },

  getFuncToGetPromiseToUpdate: function () {
    var self = this;
    return function() {
      return db.realtimeDatabase.updateDatabase('users', self);
    };
  },

  getAuthToken: function () {
    return 'authtoken' + this.data.authTokenCount.toString();
  },

  getAccessToken: function () {
    return 'accesstoken' + this.data.accessTokenCount.toString();
  },

  getRefreshToken: function () {
    return 'refreshtoken' + this.data.refreshTokenCount.toString();
  },

  updateAuthToken: function () {
    this.data.authTokenCount++;
  },

  updateAccessToken: function () {
    this.data.accessTokenCount++;
  },

  updateRefreshToken: function () {
    this.data.refreshTokenCount++;
  }
};

//tokenManager.updateDatabase();
//tokenManager.loadDatabase();

exports.tokenManager = tokenManager;
