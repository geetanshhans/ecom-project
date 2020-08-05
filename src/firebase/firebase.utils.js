import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBxLgBOeuf07carhoPMU5if7Y1VjI-H5e0",
  authDomain: "ecom-db-77a10.firebaseapp.com",
  databaseURL: "https://ecom-db-77a10.firebaseio.com",
  projectId: "ecom-db-77a10",
  storageBucket: "ecom-db-77a10.appspot.com",
  messagingSenderId: "129985396334",
  appId: "1:129985396334:web:c43d34b60c2ef92fb2307f",
  measurementId: "G-59EMPBQCM5",
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
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
