import firebase from 'firebase/app';
import 'firebase/auth';

const {
  REACT_APP_FIREBASE_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_PROJECT,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING,
  REACT_APP_FIREBASE_APP,
  REACT_APP_FIREBASE_MEASUREMENT,
} = process.env;

const app = firebase.initializeApp({
  apiKey: `${REACT_APP_FIREBASE_KEY}`,
  authDomain: `${REACT_APP_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${REACT_APP_FIREBASE_PROJECT}`,
  storageBucket: `${REACT_APP_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${REACT_APP_FIREBASE_MESSAGING}`,
  appId: `${REACT_APP_FIREBASE_APP}`,
  measurementId: `${REACT_APP_FIREBASE_MEASUREMENT}`,
});

export default app;
