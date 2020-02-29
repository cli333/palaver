import firebase from "firebase";
import firebaseConfig from "./firebase";

require("firebase/firestore");

class MyFirebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }

  createNewUser = async (name, email, password) => {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    return await newUser.user.updateProfile({
      displayName: name,
      photoURL: "https://i.pravatar.cc/300"
    });
  };

  login = async (email, password) => {
    return await this.auth.signInWithEmailAndPassword({ email, password });
  };

  logout = async () => {
    return await this.auth.signOut();
  };
}

export default MyFirebase;
