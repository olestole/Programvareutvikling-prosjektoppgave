import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import { UserContext } from '../components/UserProvider';
import { postReq } from '../utils/api';
import RequireLogin from '../utils/requireLogin';

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

const Room = props => {
  const classes = useStyles();

  const { title, room_number, price, capacity } = props.room;
  const { handleBooking } = props;
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image="/Hotelroom.jpg"
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

// Styles for the Roomlist container
const listStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    width: '70%'
  }
});

const Roomlist = props => {
  const classes = listStyles();

  const context = useContext(UserContext);
  const router = useRouter();

  const [isBooking, setIsBooking] = useState(false);

  const passInfo = async roomId => {
    const body = {
      from_date: context.user.booking.from_date,
      to_date: context.user.booking.to_date,
      people: context.user.booking.people,
      room_id: roomId,
      customer: context.user.customer
    };

    const bookingInfo = await postReq(
      body,
      'bookings/',
      context.user.accessToken
    );

    await context.setUser({
      ...context.user,
      bookedRoom: bookingInfo
    });

    router.push('/booking');
  };

  const handleBooking = id => {
    setIsBooking(true);
    context.user.loggedIn && passInfo(id);
  };

  if (isBooking && !context.user.loggedIn) {
    return (
      <RequireLogin>
        <span>If you see this, something went wrong</span>
      </RequireLogin>
    );
  }
  return (
    <div className={classes.root}>
      {props.rooms.map(room => (
        <Room
          key={room.id}
          room={room}
          handleBooking={() => handleBooking(room.id)}
        />
      ))}
    </div>
  );
};

export default Roomlist;
