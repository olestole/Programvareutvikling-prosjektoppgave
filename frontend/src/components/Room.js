import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import config from '../../config/env';

import { UserContext } from '../components/UserProvider';

// Styles for Room. This should be placed in media query
// Not optimal for phone view at all
const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: '100%',
    maxWidth: '100%',
    marginTop: '2em'
  },
  media: {
    height: 'auto' /* Imageheight has to specified for image to show */,
    flex: '1'
  },
  flexList: {
    flex: '2.5',
    width: '100%'
  }
});

const MediaCard = props => {
  const classes = useStyles();
  const context = useContext(UserContext);
  const router = useRouter();

  const passInfo = async () => {
    console.log(context.user);
    const body = {
      from_date: context.user.booking.from_date,
      to_date: context.user.booking.to_date,
      people: context.user.booking.people,
      room_id: props.room.id,
      customer: context.user.customer
    };

    console.log(body);
    console.log('HALLALLALALA');
    const res = await fetch(`${config.serverUrl}bookings/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + context.user.accessToken
      },
      body: JSON.stringify(body)
    });

    const bookingInfo = res.json();

    context.setUser({
      ...context.user,
      bookedRoom: bookingInfo
    });

    router.push('/booking');
  };

  const handleBooking = () => {
    context.user.loggedIn
      ? passInfo()
      : router.push({
          pathname: '/login',
          query: {
            loggedIn: false
          }
        });
  };

  const { title, room_number, price, capacity } = props.room;
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image="/building.jpg"
        title="Contemplative Reptile"
      />
      <List className={classes.flexList} aria-label="Room attributes">
        <ListItem>
          <ListItemText variant="h5" primary={title} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary={`${capacity} sengeplasser`} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary={price} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary={room_number} />
        </ListItem>
        <Divider />
        <ListItem>
          <Button size="small" color="primary" onClick={handleBooking}>
            Book nå
          </Button>
        </ListItem>
      </List>
    </Card>
  );
};

export default MediaCard;
