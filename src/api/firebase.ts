import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
  // projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  apiKey: "AIzaSyCjnr9U4XYuUgQVWjP02EVvvtK_Nd546Po",
  authDomain: "bohodays-893be.firebaseapp.com",
  databaseURL:
    "https://bohodays-893be-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bohodays-893be",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export function login() {
  console.log(firebaseConfig);

  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
    })
    .catch(console.error);
}
