import React from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

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
  const { handleClick } = props;
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
          <Button size="small" color="primary" onClick={handleClick}>
            Se mer
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

  const router = useRouter();

  const handleClick = id => {
    const { from_date, to_date } = router.query;
    router.push(
      `/rooms/[id]/?from_date=${from_date}&to_date=${to_date}`,
      `/rooms/${id}/?from_date=${from_date}&to_date=${to_date}`
    );
  };

  return (
    <div className={classes.root}>
      {props.rooms.map(room => (
        <Room
          key={room.id}
          room={room}
          handleClick={() => handleClick(room.id)}
        />
      ))}
    </div>
  );
};

export default Roomlist;
