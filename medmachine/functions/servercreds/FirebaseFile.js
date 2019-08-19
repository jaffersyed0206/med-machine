const admin = require('firebase-admin');
const service = require('./service.json');
const init  = admin.initializeApp({
    credential: admin.credential.cert(service),
    databaseURL: "https://medicalmachine-c4deb.firebaseio.com"
  });

module.exports = init;   