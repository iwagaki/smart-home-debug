const admin = require('firebase-admin');
const serviceAccount = require('./home-debugger-a13a19250360.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://home-debugger-c86f2.firebaseio.com/'
});


function initilizeDatabase() {
  const ref = admin.database().ref('/users') // .push();

  ref.set({
    authTokenCount: 1000,
    accessTokenCount: 1000,
    refreshTokenCount: 1000
  }, error => {
    if (error) {
      console.log("save error", error.message);
    } else {
      console.log("save success");
    }
  });
}

//initilizeDatabase();



var accountManager = {
  tokens: {
    authTokenCount: 1000,
    accessTokenCount: 1000,
    refreshTokenCount: 1000
  },

  loadDatabase: function () {
    admin.database().ref("/users").once("value")
      .then(snapshot => {
        this.tokens = snapshot.val();
        console.log('loading...' + JSON.stringify(this.tokens));
      }).catch(error => {
        console.log("Can't access to database", error);
      });
  },

  updateDatabase: function () {
    const ref = admin.database().ref('/users') // .push();

    ref.set(this.tokens, error => {
      if (error) {
        console.log("save error", error.message);
      } else {
        console.log("save success");
      }
    });
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

accountManager.loadDatabase();

exports.accountManager = accountManager;
