var accountManager = {
  authTokenCount: 1000,
  accessTokenCount: 1000,
  refreshTokenCount: 1000,

  getAuthToken: function() {
    return 'authtoken' + this.authTokenCount.toString();
  },

  getAccessToken: function() {
    return 'accesstoken' + this.accessTokenCount.toString();
  },

  getRefreshToken: function() {
    return 'refreshtoken' + this.refreshTokenCount.toString();
  },

  updateAuthToken: function() {
    // this.authTokenCount++;
  },

  updateAccessToken: function() {
    // this.accessTokenCount++;
  },

  updateRefreshToken: function() {
    // this.refreshTokenCount++;
  }
};

exports.accountManager = accountManager;
