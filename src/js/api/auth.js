import db from "../db/firestore";
import firebase from "firebase/app";
import "firebase/auth";

const createUserProfile = (userProfile) =>
  db.collection("profiles").doc(userProfile.uid).set(userProfile);

export async function register({ email, password, username, avatar }) {
  try {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    await createUserProfile({
      uid: user.uid,
      username,
      email,
      avatar,
      joinedChats: [],
    });
    // console.log(user);
    return user;
  } catch (e) {
    return Promise.reject(error.message);
  }
}

export const logout = () => firebase.auth().signOut();

export const onAuthStateChanges = (onAuth) =>
  firebase.auth().onAuthStateChanged(onAuth);
