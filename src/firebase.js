import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA8LhzaJguqabVfiaGs8vPhez7Ofue6ckg",
  authDomain: "clone-a5a48.firebaseapp.com",
  projectId: "clone-a5a48",
  storageBucket: "clone-a5a48.appspot.com",
  messagingSenderId: "876640679505",
  appId: "1:876640679505:web:3d9316c9dd3b6000ccea70",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
