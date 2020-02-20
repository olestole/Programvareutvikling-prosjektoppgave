import React, { useContext } from 'react';
import { UserContext } from './UserProvider'; // Import this wherever you'd want to use the global state

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Avatar from './Avatar';

import Link from 'next/link';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
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

  const getAvatarImage = () => {
    const username = context.user.username;
    if (username !== '') {
      return <Avatar letter={username[0].toUpperCase()} color="purple" />;
    }
    return <Avatar />;
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link href="/">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" className={classes.title}></Typography>
          <Link href="/login">
            <Button color="inherit">Login</Button>
          </Link>
          {getAvatarImage()}
        </Toolbar>
      </AppBar>
    </div>
  );
}
