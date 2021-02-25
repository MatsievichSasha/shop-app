import firebase from "firebase/app";
import "firebase/auth";

const dbApp = firebase.initializeApp({
  apiKey: "AIzaSyB_iAyk19pxSMjUuzy4gycOjQaANETeraM",
  authDomain: "test-shop-2-bbf86.firebaseapp.com",
  databaseURL: "https://test-shop-2-bbf86-default-rtdb.firebaseio.com",
  projectId: "test-shop-2-bbf86",
  storageBucket: "test-shop-2-bbf86.appspot.com",
  messagingSenderId: "50116861090",
  appId: "1:50116861090:web:b1104ba471dfcbc85f8bfb"
});

export const auth = dbApp.auth();

export default dbApp;
