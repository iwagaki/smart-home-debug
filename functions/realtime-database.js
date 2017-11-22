const admin = require('firebase-admin');
const serviceAccount = require('./home-debugger-a13a19250360.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://home-debugger-c86f2.firebaseio.com/'
});

var realtimeDatabase = {
  loadDatabase: function (key, obj) {
    return admin.database().ref(key).once('value')
      .then(snapshot => {
        obj.data = snapshot.val();
        console.log('loaded: ' + JSON.stringify(obj.data));
      })
      .catch(error => {
        console.log('Can\'t access to database', error);
      });
  },

  updateDatabase: function (key, obj) {
    const ref = admin.database().ref(key);
    return ref.set(obj.data, error => {
      if (error) {
        console.log('Can\'t access to database', error);
      } else {
        console.log('saved: ' + JSON.stringify(obj.data));
      }
    });
  },

  hasChildPromise: function (key) {
    return admin.database().ref().once('value')
      .then(snapshot => {
        return new Promise(function (resolve, reject) {
          if (snapshot.hasChild(key)) {
            resolve();
          } else {
            reject();
          }
        });
      });
  }
};

exports.realtimeDatabase = realtimeDatabase;
