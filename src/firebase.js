import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLXvjRMs01lW6ewWLHe526fMmd6t33KI4",
  authDomain: "vicishop-373eb.firebaseapp.com",
  projectId: "vicishop-373eb",
  storageBucket: "vicishop-373eb.appspot.com",
  messagingSenderId: "790567357137",
  appId: "1:790567357137:web:d315cdadf5a91c1a7053f0",
  measurementId: "G-Q0LJ8WY0GF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;