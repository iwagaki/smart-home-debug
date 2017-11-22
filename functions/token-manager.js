const realtimeDatabaseInstance = require('./realtime-database');
const realtimeDatabase = realtimeDatabaseInstance.realtimeDatabase;

var tokenManager = {
  data: {
    authTokenCount: 1000,
    accessTokenCount: 1000,
    refreshTokenCount: 1000
  },

  getFuncToGetPromiseToLoad: function () {
    var self = this;
    return function () {
      return realtimeDatabase.loadDatabase('users', self);
    };
  },

  getFuncToGetPromiseToUpdate: function () {
    var self = this;
    return function () {
      return realtimeDatabase.updateDatabase('users', self);
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

// Initialize 'users' data if the database doesn't have the key
realtimeDatabase.hasChildPromise('users')
  .catch(tokenManager.getFuncToGetPromiseToUpdate());

exports.tokenManager = tokenManager;
