import React, { useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";

import { context } from "../../context/context";

import firebase from "../../firebase/firebase";

const SendMessage = () => {
  const [message, setMessage] = useState("");

  const { currentChannel, user, isSubmitting, setIsSubmitting } = useContext(
    context
  );

  const handleSubmit = e => {
    e.preventDefault();
    if (!currentChannel || isSubmitting) return;
    const newMessage = {
      user: user.email,
      userId: user.uid,
      message
    };
    (async () => {
      setIsSubmitting(true);
      await firebase
        .firestore()
        .collection("channels")
        .doc(currentChannel.name)
        .update({
          messages: firebase.firestore.FieldValue.arrayUnion(newMessage)
        });
      setIsSubmitting(false);
      setMessage("");
    })();
  };

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <Grid container style={{ padding: "20px" }}>
        <Grid item xs={11}>
          <TextField
            id="outlined-basic-email"
            label="Send a message"
            fullWidth
            value={message}
            onChange={e => setMessage(e.target.value)}
            disabled={currentChannel === null || isSubmitting ? true : false}
          />
        </Grid>
        <Grid xs={1} align="right">
          <Fab color="primary" aria-label="add">
            <SendIcon onClick={e => handleSubmit(e)} />
          </Fab>
        </Grid>
      </Grid>
    </form>
  );
};

export default SendMessage;
