import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";
import "firebase/firestore"
import { getFirestore } from 'firebase/firestore';
const firebaseConf =
{                     
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConf);

const auth = getAuth(app);

const store = getFirestore(app);
const storage = getStorage(app);

const provider = new GoogleAuthProvider();

export {
  auth,
  store,
  provider,
  signInWithPopup,
  storage,
};
export default app