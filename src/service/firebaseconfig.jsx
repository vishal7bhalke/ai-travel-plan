// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVQFN2sGzbyLlIiUVAmu9-8MwxW-1Cx3Q",
  authDomain: "ai-travel-64dc5.firebaseapp.com",
  projectId: "ai-travel-64dc5",
  storageBucket: "ai-travel-64dc5.firebasestorage.app",
  messagingSenderId: "294024840105",
  appId: "1:294024840105:web:f21c4e11a5189a7467fab8",
  measurementId: "G-JRVGQGHHNJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const db=getFirestore(app);