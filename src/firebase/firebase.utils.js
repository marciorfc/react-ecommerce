import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyA5LCz9oIXdE2aexSWfBU9upjv2EIhIFRc',
  authDomain: 'crwn-db-57442.firebaseapp.com',
  databaseURL: 'https://crwn-db-57442.firebaseio.com',
  projectId: 'crwn-db-57442',
  storageBucket: 'crwn-db-57442.appspot.com',
  messagingSenderId: '275110325263',
  appId: '1:275110325263:web:03e37ff68c9f69f80e877a',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
