import React, { useContext } from 'react';
import { UserContext } from './UserProvider'; // Import this wherever you'd want to use the global state

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import SideDrawer from './SideDrawer';

import Avatar from './Avatar';

import Link from 'next/link';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'block',
    height: 'auto',
    position: 'sticky',
    width: '100%',
    zIndex: 1000,
    backgroundColor: '#3C3C3C'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    fontSize: 30
  },
  center: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

export default function Navbar() {
  const context = useContext(UserContext);
  const classes = useStyles();

  const RenderLogin = () =>
    context.user.loggedIn ? (
      <div></div>
    ) : (
      <Link href="/login">
        <Button color="inherit">Login</Button>
      </Link>
    );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <SideDrawer />
          <Typography variant="alignCenter" className={classes.title}>
            SKIKKELIG FANCY HOTELL
          </Typography>
          <RenderLogin />
          <Avatar
            letter={
              context.user.loggedIn ? context.user.email[0].toUpperCase() : null
            }
            color={context.user.loggedIn ? 'purple' : null}
          ></Avatar>
        </Toolbar>
      </AppBar>
    </div>
  );
}
