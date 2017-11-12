import firebase from 'firebase'
//firebase config
var config = {
  apiKey: "AIzaSyDuMOLRhPhn3NnmnmeqgE6Z-gxpzYqCfmw",
  authDomain: "facbookimages.firebaseapp.com",
  databaseURL: "https://facbookimages.firebaseio.com",
  projectId: "facbookimages",
  storageBucket: "facbookimages.appspot.com",
  messagingSenderId: "829033883036"
};
var fire = firebase.initializeApp(config);
export default fire;
