import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { postReq, getRoomById } from '../utils/api';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  half: {
    height: '4em',
    margin: '5px',
    flexGrow: '1 1 0',
    width: `calc(50% - 10px)`
  },
  full: {
    width: `calc(100% - 10px)`,
    margin: '5px'
  },
  third: {
    height: '4em',
    margin: '5px',
    width: 'calc(33.3% - 10px)'
  },
  twoThird: {
    height: '4em',
    margin: '5px',
    width: 'calc(66.6% - 10px)'
  },
  regBtn: {
    width: `calc(100% - 10px)`,
    margin: '5px'
  }
});

const RoomEditor = () => {
  const classes = useStyles();
  const router = useRouter();

  const [regState, setRegState] = useState({
    newRoomNumber: '',
    newTitle: '',
    newPrice: '',
    newCapacity: '',
    newImages: []
  });

  const handleChange = e => {
    e.preventDefault();
    setRegState({
      ...regState,
      [e.target.name]: e.target.value
    });
  };

  // const addRoom = async () => {
  //   await context.setRoom({
  //     ...context.room,
  //     room: {
  //       room_number: regState.newRoomNumber,
  //       title: regState.newTitle,
  //       price: regState.newPrice,
  //       capacity: regState.newCapacity,
  //       images: regState.newImages
  //     }
  //   });

  //   // CREATE BODY TO POST THE NEW ROOM TO BACKEND
  //   const body = {
  //     room_number: regState.newRoomNumber,
  //     title: regState.newTitle,
  //     price: regState.newPrice,
  //     capacity: regState.newCapacity,
  //     images: regState.newImages
  //   };

  //   // POST THE NEW ROOM TO BACKEND
  //   const res = await putReq(body, 'rooms/');

  //   if (res) {
  //     router.push('/');
  //   } else {
  //     // Error when the room already exists
  //     alert('Room already exists😟');
  //   }
  // };

  return (
    <form className={classes.container}>
      <div className={classes.section}>
        <TextField
          fullWidth
          onChange={handleChange}
          name="newRoomNumber"
          type="number"
          id="outlined-basic 1"
          label="Rom nummer"
          variant="outlined"
          className={classes.full}
        />
      </div>
      <div className={classes.section}>
        <TextField
          name="newTitle"
          onChange={handleChange}
          id="outlined-basic 2"
          label="Tittel"
          variant="outlined"
          className={classes.half}
        />
      </div>
      <div className={classes.div1}>
        <TextField
          onChange={handleChange}
          name="newPrice"
          type="number"
          id="outlined-basic 4"
          label="Pris"
          variant="outlined"
          className={classes.third}
        />
        <TextField
          onChange={handleChange}
          name="newCapacity"
          type="text"
          id="outlined-basic 5"
          label="Kapasitet"
          variant="outlined"
          className={classes.third}
        />
      </div>
      <div>
        <TextField
          onChange={handleChange}
          name="newImages"
          type="file"
          id="outlined-basic 7"
          label="Bilde"
          variant="outlined"
          className={classes.third}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        className={classes.regBtn}
        // onClick={addRoom}
      >
        Lag nytt rom
      </Button>

      <Button
        variant="contained"
        color="primary"
        className={classes.regBtn}
        // onClick={addRoom}
      >
        Oppdater rom
      </Button>
    </form>
  );
};

export default RoomEditor;
