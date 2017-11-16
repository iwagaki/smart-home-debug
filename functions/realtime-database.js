const admin = require('firebase-admin');
const serviceAccount = require('./home-debugger-a13a19250360.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://home-debugger-c86f2.firebaseio.com/'
});

var realtimeDatabase = {
  loadDatabase: function (key, obj) {
    admin.database().ref(key).once('value')
      .then(snapshot => {
        obj = snapshot.val();
        console.log('loaded: ' + JSON.stringify(obj));
      }).catch(error => {
        console.log('Can't access to database', error);
      });
  },

  updateDatabase: function (key, obj) {
    const ref = admin.database().ref(key);

    ref.set(obj, error => {
      if (error) {
        console.log('save error', error.message);
      } else {
        console.log('saved: ' + JSON.stringify(obj));
      }
    });
  },

};

exports.realtimeDatabase = realtimeDatabase;
