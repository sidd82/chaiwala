import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyB1zRut7MPat3jMYGUB3xJtSFfCthEk32s",
  authDomain: "chai-wala-19bb9.firebaseapp.com",
  databaseURL: "https://chai-wala-19bb9.firebaseio.com",
  projectId: "chai-wala-19bb9",
  storageBucket: "chai-wala-19bb9.appspot.com",
  messagingSenderId: "413210618467"
};

firebase.initializeApp(config);

export default firebase;
