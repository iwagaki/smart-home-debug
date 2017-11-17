const db = require('./realtime-database');

var accountManager = {
  data: {
    authTokenCount: 1000,
    accessTokenCount: 1000,
    refreshTokenCount: 1000
  },

  loadDatabase: function () {
    db.realtimeDatabase.loadDatabase('users', this);
  },

  updateDatabase: function () {
    db.realtimeDatabase.updateDatabase('users', this);
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
    this.updateDatabase();
  },

  updateAccessToken: function () {
    this.data.accessTokenCount++;
    this.updateDatabase();
  },

  updateRefreshToken: function () {
    this.data.refreshTokenCount++;
    this.updateDatabase();
  }
};

//accountManager.updateDatabase();
accountManager.loadDatabase();
console.log(JSON.stringify(accountManager.data));

exports.accountManager = accountManager;
