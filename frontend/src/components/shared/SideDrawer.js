import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from './UserProvider';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
// import PersonIcon from '@material-ui/icons/Person';
import HotelIcon from '@material-ui/icons/Hotel';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import ListIcon from '@material-ui/icons/List';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

const links = [{ link: '/', icon: HomeIcon, text: 'Home' }];

const linksPriv = [
  { link: '/user', icon: HotelIcon, text: 'Mine bookinger' },
  { link: '/userprofile', icon: AccountCircleIcon, text: 'Min side' }
];

const linksAdmin = [
  { link: '/userprofile', icon: AccountCircleIcon, text: 'Min side' },
  { link: '/user', icon: HotelIcon, text: 'Bookingliste' },
  { link: '/admin/rooms', icon: ListIcon, text: 'Romliste' },
  { link: '/admin/rooms/new', icon: PlaylistAddIcon, text: 'Legg til rom' }
];

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
});

const TemporaryDrawer = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });
  const context = useContext(UserContext);

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const chooseList = context.user.is_staff ? linksAdmin : linksPriv;

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {links.map((path, index) => (
          <Link key={index} href={path.link}>
            <ListItem button>
              <ListItemIcon>
                <path.icon />
              </ListItemIcon>
              <ListItemText primary={path.text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />

      <List>
        {chooseList.map((path, index) => (
          <Link key={index} href={path.link}>
            <ListItem button>
              <ListItemIcon>
                <path.icon />
              </ListItemIcon>
              <ListItemText primary={path.text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  const fullList = side => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {links.map((path, index) => (
          <Link key={index} href={path.link}>
            <ListItem button>
              <ListItemIcon>
                <path.icon />
              </ListItemIcon>
              <ListItemText primary={path.text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />

      <List>
        {linksPriv.map((path, index) => (
          <Link key={index} href={path.link}>
            <ListItem button>
              <ListItemIcon>
                <path.icon />
              </ListItemIcon>
              <ListItemText primary={path.text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer('left', true)} style={{ color: 'inherit' }}>
        <MenuIcon />
      </Button>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
      <Drawer
        anchor="top"
        open={state.top}
        onClose={toggleDrawer('top', false)}
      >
        {fullList('top')}
      </Drawer>
      <Drawer
        anchor="bottom"
        open={state.bottom}
        onClose={toggleDrawer('bottom', false)}
      >
        {fullList('bottom')}
      </Drawer>
      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer('right', false)}
      >
        {sideList('right')}
      </Drawer>
    </div>
  );
};

export default TemporaryDrawer;
