import React, { createContext, useEffect, useState } from "react";
import firebase from "../firebase/firebase";

export const context = createContext();

const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [channels, setChannels] = useState([]);
  const [currentChannel, setCurrentChannel] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        firebase
          .firestore()
          .collection("channels")
          .get()
          .then(res => {
            setChannels(res.docs.map(doc => doc.data()));
          });
      }
    });
  }, [user]);

  return (
    <context.Provider
      value={{ user, channels, currentChannel, setCurrentChannel }}
    >
      {children}
    </context.Provider>
  );
};

export default Provider;
