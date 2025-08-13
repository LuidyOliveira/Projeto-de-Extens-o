// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWzRpmgoCk1hFNQlfRWq58W_xZV9vSfTA",
  authDomain: "projetoextensao-b3b2e.firebaseapp.com",
  projectId: "projetoextensao-b3b2e",
  storageBucket: "projetoextensao-b3b2e.firebasestorage.app",
  messagingSenderId: "476721658775",
  appId: "1:476721658775:web:2ee1901dee0459018e22d2",
  measurementId: "G-11CD3DS71D",
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
export const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
