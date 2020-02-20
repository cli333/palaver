import React, { createContext, useEffect, useState } from "react";
import firebase from "../firebase/firebase";

export const context = createContext();

const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [channels, setChannels] = useState([]);
  const [currentChannel, setCurrentChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  useEffect(() => {
    if (currentChannel) setMessages(currentChannel.messages);
  }, [currentChannel]);

  useEffect(() => {
    if (currentChannel) {
      firebase
        .firestore()
        .collection("channels")
        .doc(currentChannel.name)
        .onSnapshot(async doc => {
          const newMessages = await doc.data().messages;
          setMessages(newMessages);
        });
    }
  }, [isSubmitting, currentChannel]);

  return (
    <context.Provider
      value={{
        user,
        channels,
        currentChannel,
        setCurrentChannel,
        messages,
        setMessages,
        isSubmitting,
        setIsSubmitting
      }}
    >
      {children}
    </context.Provider>
  );
};

export default Provider;
