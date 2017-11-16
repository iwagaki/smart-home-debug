const db = require('./realtime-database');

var accountManager = {
  tokens: {
    authTokenCount: 1000,
    accessTokenCount: 1000,
    refreshTokenCount: 1000
  },

  loadDatabase: function () {
    db.realtimeDatabase.loadDatabase('users', this.tokens);
  },

  updateDatabase: function () {
    db.realtimeDatabase.updateDatabase('users', this.tokens);
  },

  getAuthToken: function () {
    return 'authtoken' + this.tokens.authTokenCount.toString();
  },

  getAccessToken: function () {
    return 'accesstoken' + this.tokens.accessTokenCount.toString();
  },

  getRefreshToken: function () {
    return 'refreshtoken' + this.tokens.refreshTokenCount.toString();
  },

  updateAuthToken: function () {
    this.tokens.authTokenCount++;
    this.updateDatabase();
  },

  updateAccessToken: function () {
    this.tokens.accessTokenCount++;
    this.updateDatabase();
  },

  updateRefreshToken: function () {
    this.tokens.refreshTokenCount++;
    this.updateDatabase();
  }
};

//accountManager.updateDatabase();
accountManager.loadDatabase();
console.log(JSON.stringify(accountManager.tokens));

exports.accountManager = accountManager;
