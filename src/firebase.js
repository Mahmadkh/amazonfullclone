// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import firebase from 'firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCuexOYiF9u1JPXES3aWhQzCn7hB4ksFL8",
  authDomain: "challenge-ff654.firebaseapp.com",
  projectId: "challenge-ff654",
  storageBucket: "challenge-ff654.appspot.com",
  messagingSenderId: "395548450309",
  appId: "1:395548450309:web:2040ebde42214c7370866c",
  measurementId: "G-C46QGYCWY2",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore(); 
const auth = firebase.auth(); 

export { db, auth };