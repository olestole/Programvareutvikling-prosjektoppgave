import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import { TextField, Chip } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { UserContext } from './UserProvider';
import { putReq, postReq } from '../utils/api';

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
  descriptionFieldDiv: {
    height: '8em'
  },
  descrField: {
    margin: '5px',
    width: `calc(100% - 10px)`,
    height: '40px'
  },
  regBtn: {
    width: `calc(100% - 10px)`,
    margin: '5px'
  }
});

const RoomEditor = props => {
  const classes = useStyles();
  const router = useRouter();
  const context = useContext(UserContext);

  const [regState, setRegState] = useState({
    newRoomNumber: '',
    newTitle: '',
    newPrice: '',
    newCapacity: '',
    newDescription: '',
    newAmenities: []
  });

  const handleChange = e => {
    e.preventDefault();
    console.log(e.target.value);
    setRegState({
      ...regState,
      [e.target.name]: e.target.value
    });
  };

  const handleAmenityChange = (e, value) => {
    e.preventDefault();
    setRegState({
      ...regState,
      newAmenities: value.map(val => val.key)
    });
  };

  const submitRoom = e => {
    e.preventDefault();
    addRoom();
  };

  const addRoom = async () => {
    // CREATE BODY TO POST THE NEW ROOM TO BACKEND
    const body = {
      room_number: regState.newRoomNumber,
      title: regState.newTitle,
      price: regState.newPrice,
      capacity: regState.newCapacity,
      description: regState.newDescription,
      amenities: regState.newAmenities
    };

    // POST THE NEW ROOM TO BACKEND
    const res = await postReq(body, 'rooms/', context.user.accessToken);

    console.log(res);

    if (res) {
      router.push('/');
    } else {
      // Error when the room already exists
      alert('Room already exists😟');
    }
  };

  const { amenities } = props;

  return (
    <form className={classes.container} onSubmit={submitRoom}>
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
      <div className={classes.descriptionFieldDiv}>
        <TextField
          onChange={handleChange}
          name="newDescription"
          type="text"
          id="outlined-basic 4"
          label="Beskrivelse"
          variant="outlined"
          className={classes.descrField}
        />
      </div>
      <Autocomplete
        multiple
        id="amenities"
        options={amenities}
        getOptionLabel={option => option.value}
        getOptionValue={option => option.key}
        onChange={handleAmenityChange}
        renderInput={params => (
          <TextField {...params} label="fasiliteter" variant="standard" />
        )}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.regBtn}
        type="submit"
        // onClick={addRoom}
      >
        Lag nytt rom
      </Button>
    </form>
  );
};

export default RoomEditor;
