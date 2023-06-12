import firebase from 'firebase-admin'
const credentials = require('../../firebase-credentials.json')

export const firebaseApp = () =>  firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
  databaseURL: 'https://api-keys-ef507.firebaseio.com',
})


