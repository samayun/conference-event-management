// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import firebaseConfig from "./config";

export const initFirebase = () => {
    if (firebase.apps.length === 0) {
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }
}

const app = (firebase.apps.length === 0) && firebase.initializeApp(firebaseConfig);
console.log(app.name);

// firebase auth
export const auth = firebase.auth();

export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const githubProvider = new firebase.auth.GithubAuthProvider();

export const signInWithPopup = provider => firebase.auth().signInWithPopup(provider)

export const signOut = () => firebase.auth().signOut()

export const signUp = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password)

export const signIn = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password)

export const onAuthStateChanged = handler => firebase.auth().onAuthStateChanged(user => handler(user))

export const getCurrentUser = () => firebase.auth().currentUser

export const updateProfile = () => firebase.auth().currentUser.updateProfile

export const getIdToken = () => {
    return getCurrentUser() ? getCurrentUser().getIdToken(/* forceRefresh */ true) : null;
}
