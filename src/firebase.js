import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyB8rziyfFjaTGMgxTTHA25AYFQ196shCvA",
  authDomain: "test-shop-01.firebaseapp.com",
  databaseURL: "https://test-shop-01-default-rtdb.firebaseio.com",
  projectId: "test-shop-01",
  storageBucket: "test-shop-01.appspot.com",
  messagingSenderId: "729583535519",
  appId: "1:729583535519:web:10828ad0bb4cb0120469aa"
});

export const auth = app.auth()
export default app