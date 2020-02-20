import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import TimelineIcon from "@material-ui/icons/Timeline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { withRouter } from "react-router-dom";

import firebase from "../../firebase/firebase";

import { formIsValid } from "../../utils/utils";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#009be5"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  link: {
    cursor: "pointer"
  }
}));

const Register = ({ history }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: "",
    password: "",
    passwordConfirmation: ""
  });
  const { email, password, passwordConfirmation } = values;
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    if (!formIsValid(values)) {
      setError("Password confirmation does not match");
      setSubmitting(false);
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(authResponse => {
        const userObj = {
          email: authResponse.user.email,
          id: authResponse.user.uid
        };
        firebase
          .firestore()
          .collection("users")
          .doc(userObj.id)
          .set(userObj)
          .then(() => history.push("/"))
          .catch(error => {
            console.log("DB ERROR", error);
            setError(error.message);
          });
      })
      .catch(error => {
        console.log(error);
        setError(error.message);
      })
      .finally(() => {
        setSubmitting(false);
        setError(null);
      });
  }

  function handleChange(e) {
    // synthetic events readup
    e.persist();
    setValues(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }));
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <TimelineIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={e => handleSubmit(e)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => handleChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => handleChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="passwordConfirmation"
            label="Password Confirmation"
            type="password"
            id="passwordConfirmation"
            autoComplete="current-password"
            value={passwordConfirmation}
            onChange={e => handleChange(e)}
          />
          {error ? (
            <Typography component="h5" variant="h6">
              {error}
            </Typography>
          ) : null}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            disabled={submitting}
            color="primary"
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link
                className={classes.link}
                variant="body2"
                onClick={() => history.push("/login")}
              >
                {"Already have an account? Log In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default withRouter(Register);
