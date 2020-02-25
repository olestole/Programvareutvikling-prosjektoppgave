import React, { useContext } from 'react';
import { UserContext } from './UserProvider'; // Import this wherever you'd want to use the global state

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import SideDrawer from './SideDrawer';

import Avatar from './Avatar';

import Link from 'next/link';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: '9vh'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function Navbar() {
  const context = useContext(UserContext);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <SideDrawer />
          <Typography variant="h6" className={classes.title}></Typography>
          <Link href="/login">
            <Button color="inherit">Login</Button>
          </Link>
          <Avatar
            letter={
              context.user.loggedIn
                ? context.user.username[0].toUpperCase()
                : null
            }
            color={context.user.loggedIn ? 'purple' : null}
          ></Avatar>
        </Toolbar>
      </AppBar>
    </div>
  );
}
