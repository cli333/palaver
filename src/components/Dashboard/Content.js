import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { context } from "../../context/context";

import SendMessage from "./SendMessage";

const styles = theme => ({
  paper: {
    maxWidth: 1500,
    margin: "auto",
    overflow: "hidden",
    height: "90vh"
  },
  searchBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)"
  },
  searchInput: {
    fontSize: theme.typography.fontSize
  },
  block: {
    display: "block"
  },
  addUser: {
    marginRight: theme.spacing(1)
  },
  contentWrapper: {
    margin: "40px 16px"
  },
  messageArea: {
    height: "75vh",
    overflowY: "auto"
  }
});

function Content({ classes }) {
  const { currentChannel, messages } = useContext(context);
  const [filter, setFilter] = useState("");

  const displayMessages = filter => {
    return messages
      .filter(
        message =>
          message.user.toLowerCase().includes(filter) ||
          message.message.toLowerCase().includes(filter)
      )
      .map(({ message, userId, user }, idx) => (
        <ListItem key={`${userId} ${idx}`}>
          <Grid container>
            <Grid item xs={12}>
              <ListItemText align="left" primary={message}></ListItemText>
            </Grid>
            <Grid item xs={12}>
              <ListItemText align="left" secondary={user}></ListItemText>
            </Grid>
          </Grid>
        </ListItem>
      ));
  };

  return (
    <React.Fragment>
      <Paper className={classes.paper} square>
        <AppBar
          className={classes.searchBar}
          position="static"
          color="default"
          elevation={0}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <SearchIcon className={classes.block} color="inherit" />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder="Search this channel"
                  InputProps={{
                    disableUnderline: true,
                    className: classes.searchInput
                  }}
                  disabled={currentChannel === null ? true : false}
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <List className={classes.messageArea}>
          {!currentChannel ? (
            <div className={classes.contentWrapper}>
              <Typography color="textSecondary" align="center">
                Select a channel
              </Typography>
            </div>
          ) : currentChannel.messages.length === 0 ? (
            <div className={classes.contentWrapper}>
              <Typography color="textSecondary" align="center">
                There are no messages in this channel
              </Typography>
            </div>
          ) : (
            displayMessages(filter)
          )}
        </List>
        <SendMessage />
      </Paper>
    </React.Fragment>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Content);
