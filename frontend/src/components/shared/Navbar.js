import React, { useContext, useState } from 'react';
import { UserContext } from './UserProvider'; // Import this wherever you'd want to use the global state
import Router from 'next/router';
import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem
} from '@material-ui/core';
import SideDrawer from './SideDrawer';
import Avatar from './Avatar';
import { logout } from '../../utils/api';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'block',
    height: 'auto',
    position: 'sticky',
    top: '0',
    width: '100%',
    zIndex: 1000,
    backgroundColor: '#3C3C3C'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    fontSize: 30,
    textAlign: 'center',
    cursor: 'pointer'
  },
  center: {
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    padding: '0'
  }
}));

export default function Navbar() {
  const context = useContext(UserContext);
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout(context);
    Router.push('/');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <SideDrawer />
          <Link href="/">
            <Typography variant="h2" className={classes.title}>
              SKIKKELIG FANCY HOTELL
            </Typography>
          </Link>
          <Button className={classes.button} onClick={openMenu}>
            <Avatar
              letter={
                context.user.loggedIn
                  ? context.user.email[0].toUpperCase()
                  : null
              }
              color={context.user.loggedIn ? 'purple' : null}
            ></Avatar>
          </Button>
          <Menu
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={closeMenu}
          >
            {context.user.loggedIn ? (
              <MenuItem onClick={handleLogout}>Logg ut</MenuItem>
            ) : (
              <MenuItem>
                <Link href="/login">
                  <a style={{ color: 'inherit' }}>Logg inn</a>
                </Link>
              </MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
