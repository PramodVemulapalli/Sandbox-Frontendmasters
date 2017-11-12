import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAOU9XJOb9lwbl3nTY-Y5F7EzIcpDGyu0A",
  authDomain: "homefood-d7c6d.firebaseapp.com",
  databaseURL: "https://homefood-d7c6d.firebaseio.com",
  projectId: "homefood-d7c6d",
  storageBucket: "homefood-d7c6d.appspot.com",
  messagingSenderId: "512397701929"
};

firebase.initializeApp(config);

export default firebase;

export const storage = firebase.storage();
export const database = firebase.database();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
