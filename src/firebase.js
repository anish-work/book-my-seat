import firebase from "firebase/app";
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
// Firebase App (the core Firebase SDK) is always required and must be listed first
const firebaseConfig = {
  apiKey: "AIzaSyCaoxdPAXgC4ujKhTNg9cCMArntWAA2P7k",
  authDomain: "book-my-seat-react-app.firebaseapp.com",
  databaseURL: "https://book-my-seat-react-app.firebaseio.com",
  projectId: "book-my-seat-react-app",
  storageBucket: "book-my-seat-react-app.appspot.com",
  messagingSenderId: "18798238372",
  appId: "1:18798238372:web:a4ba195e5a313c0d2fe431",
  measurementId: "G-HX0LB25S7K",
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export async function generateUserInfo(user, additionalData) {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email } = user;
    try {
      await userRef.set({
        email,
        ...additionalData,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return getUserInfo(user.uid);
}
async function getUserInfo(uid) {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
}
export async function setUserData(user, data) {
  const docRef = await firestore.doc(`bookings/${user.email}`);
  const snapshot = await docRef.get();
  if (!snapshot.exists) {
    return docRef
      .set({
        tickets: [data],
      })
      .then(() => {
        console.log("Stored on Firebase");
      })
      .catch(function (err) {
        console.log(err);
      });
  } else {
    return docRef
      .set({
        tickets: [data, ...snapshot.data().tickets],
      })
      .catch(function (err) {
        console.log(err);
      });
  }
}
