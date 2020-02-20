import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ForumIcon from "@material-ui/icons/Forum";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";

import { context } from "../../context/context";

const styles = theme => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: "rgba(255, 255, 255, 0.7)",
    "&:hover,&:focus": {
      backgroundColor: "rgba(255, 255, 255, 0.08)"
    }
  },
  itemCategory: {
    backgroundColor: "#232f3e",
    boxShadow: "0 -1px 0 #404854 inset",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white
  },
  itemActiveItem: {
    color: "#4fc3f7",
    cursor: "pointer"
  },
  itemPrimary: {
    fontSize: "inherit",
    cursor: "pointer"
  },
  itemIcon: {
    minWidth: "auto",
    marginRight: theme.spacing(2)
  },
  divider: {
    marginTop: theme.spacing(2)
  },
  avatarText: {
    color: "white"
  }
});

function Navigator(props) {
  const { classes, ...other } = props;
  const { user, channels, currentChannel, setCurrentChannel } = useContext(
    context
  );

  const displayUserName = user => {
    return user.email;
  };

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          className={clsx(classes.firebase, classes.item, classes.itemCategory)}
        >
          palaver
        </ListItem>
        <List>
          <ListItem button key="RemySharp">
            <ListItemIcon>
              <Avatar />
            </ListItemIcon>
            <ListItemText className={clsx(classes.avatarText)}>
              {user && displayUserName(user)}
            </ListItemText>
          </ListItem>
        </List>

        <ListItem className={classes.categoryHeader}>
          <ListItemText
            classes={{
              primary: classes.categoryHeaderPrimary
            }}
          >
            # Channels
          </ListItemText>
        </ListItem>
        {channels.map(channel => (
          <React.Fragment key={channel.name}>
            <ListItem key={channel.name} className={clsx(classes.item)}>
              <ListItemIcon className={classes.itemIcon}>
                <ForumIcon />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary:
                    currentChannel && currentChannel.name === channel.name
                      ? classes.itemActiveItem
                      : classes.itemPrimary
                }}
                onClick={() => setCurrentChannel(channel)}
              >
                {channel.name}
              </ListItemText>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navigator);
