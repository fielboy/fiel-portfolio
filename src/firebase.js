// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoKouMxAfUFxJbjjEkiam77o5uTlwqlgM",
  authDomain: "weight-tracker-4233a.firebaseapp.com",
  projectId: "weight-tracker-4233a",
  storageBucket: "weight-tracker-4233a.appspot.com",
  messagingSenderId: "853529476976",
  appId: "1:853529476976:web:3ffe3ab73bbac169f219b5",
  measurementId: "G-K3YV2E1SPF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const db = getFirestore(app)

export {db}