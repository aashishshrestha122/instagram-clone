import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDIF572lt0M0nITj_gMbTGNnRpo5tpxVCI",
  authDomain: "instagram-clone-af747.firebaseapp.com",
  databaseURL: "https://instagram-clone-af747.firebaseio.com",
  projectId: "instagram-clone-af747",
  storageBucket: "instagram-clone-af747.appspot.com",
  messagingSenderId: "474873689169",
  appId: "1:474873689169:web:f404b7ffdee1f6106b7470",
  measurementId: "G-70WTBC8QFZ",
});

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
