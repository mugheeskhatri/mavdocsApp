import firebase from "firebase/compat/app";

// Optionally import the services that you want to use
import "firebase/compat/auth";
// import {...} from "firebase/compat/database";
import "firebase/compat/firestore";
// import {...} from "firebase/compat/functions";
// import {...} from "firebase/compat/storage";

// Initialize Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyBcfTrQPLeJLZktPmyv2gVrxdE0GZ9qJA8",
  authDomain: "mavdocs-123.firebaseapp.com",
  projectId: "mavdocs-123",
  storageBucket: "mavdocs-123.appspot.com",
  messagingSenderId: "938234818285",
  appId: "1:938234818285:web:da3338107a1e18758de6e4",
};

if (!firebase.apps.length) {
  const app = firebase.initializeApp(firebaseConfig);
}

export { firebase };

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
