import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Link from 'next/link';
// import Modal from '@material-ui/core/Modal';

import { deleteReq } from '../../utils/api';
import RoomEditor from './RoomEditor';
import { UserContext } from '../shared/UserProvider';

const useStyles = makeStyles({
  check: {
    display: 'flex',
    width: '100%'
  },
  root: {
    display: 'flex',
    width: '100%',
    minWidth: '100%',
    marginTop: '2em'
  },
  media: {
    height: 'auto' /* Imageheight has to specified for image to show */,
    flex: '1',
    width: '100%'
  },
  flexList: {
    flex: '2.5',
    width: '100%'
  },
  flexDiv: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  }
});

const Index = props => {
  const classes = listStyles();
  // const [open, setOpen] = React.useState(false);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <div className={classes.root}>
      {props.rooms.map(room => (
        <Room
          // handleOpen={handleOpen}
          amenities={props.amenities}
          room={room}
          key={room.id}
          room_number={room.room_number}
        />
      ))}
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <RoomEditor />
        Halla bro
      </Modal> */}
    </div>
  );
};

const Room = props => {
  const classes = useStyles();
  const { title, room_number, id, number_of_future_bookings } = props.room;
  const [edit, setEdit] = useState(false);
  const context = useContext(UserContext);

  const handleEditRoom = () => {
    // props.handleOpen();
    setEdit(!edit);
  };
  const handleDeleteRoom = () => {
    deleteReq(`admin/rooms/${props.room.id}/`, context.user.accessToken);
  };

  return (
    <div className={classes.check}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image="/Hotelroom.jpg"
          title="Contemplative Reptile"
        />
        <List className={classes.flexList} aria-label="Room attributes">
          <ListItem>
            <div className={classes.flexDiv}>
              <ListItemText primary={title} />
              <Button
                size="small"
                style={{ color: 'red' }}
                onClick={handleDeleteRoom}
              >
                Slett rom
              </Button>
            </div>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary={room_number} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary={id} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary={number_of_future_bookings} />
          </ListItem>
          <ListItem>
            <div className={classes.flexDiv}>
              <Link href={'/rooms/[id]'} as={`/rooms/${props.room.id}`}>
                <Button size="small" color="primary">
                  Detaljer
                </Button>
              </Link>
              <Button size="small" color="primary" onClick={handleEditRoom}>
                {edit ? 'Avslutt redigering' : 'Rediger'}
              </Button>
            </div>
          </ListItem>
        </List>
        {edit ? (
          <RoomEditor
            amenities={props.amenities}
            roomInfo={props.room}
            addRom={false}
            handleEditRoom={handleEditRoom}
          />
        ) : (
          <></>
        )}
      </Card>
    </div>
  );
};
const listStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    width: '50%'
  }
});

export default Index;
