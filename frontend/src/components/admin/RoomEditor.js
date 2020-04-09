import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { UserContext } from '../shared/UserProvider';
import { postReq, putReq } from '../../utils/api';

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
  descrField: {
    margin: '5px',
    width: 'calc(66.6% - 10px)'
  },
  regBtn: {
    width: `calc(100% - 10px)`,
    margin: '5px'
  },
  autocompleteField: {
    margin: '8px 10px',
    width: `calc(100%-20px)`
  }
});

const RoomEditor = props => {
  const classes = useStyles();
  const router = useRouter();
  const context = useContext(UserContext);

  const [regState, setRegState] = useState({
    room_number: '',
    title: '',
    price: '',
    capacity: '',
    description: '',
    amenities: []
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
      amenities: value.map(val => val.key)
    });
  };

  const submitRoom = e => {
    e.preventDefault();
    props.addRoom ? addRoom() : editRoom();
  };

  const editRoom = async () => {
    const body = {
      ...props.roomInfo
    };

    for (let key in regState) {
      if (!regState[key] == '') {
        if (['title', 'amenities', 'description'].includes(key)) {
          body[key] = regState[key];
        } else {
          body[key] = parseInt(regState[key]);
        }
      }
    }
    await putReq(
      body,
      `admin/rooms/${props.roomInfo.id}/`,
      context.user.accessToken
    );
    setTimeout(() => {
      props.handleEditRoom();
      console.log('Updated');
    }, 1000);
  };

  const addRoom = async () => {
    // CREATE BODY TO POST THE NEW ROOM TO BACKEND
    const body = {
      room_number: regState.room_number,
      title: regState.title,
      price: regState.price,
      capacity: regState.capacity,
      description: regState.description,
      amenities: regState.amenities
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

  return (
    <form className={classes.container} onSubmit={submitRoom}>
      <div className={classes.section}>
        <TextField
          fullWidth
          onChange={handleChange}
          name="room_number"
          type="number"
          id="outlined-basic 1"
          label="Rom nummer"
          variant="outlined"
          className={classes.half}
        />
        <TextField
          name="title"
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
          name="price"
          type="number"
          id="outlined-basic 4"
          label="Pris"
          variant="outlined"
          className={classes.half}
        />
        <TextField
          onChange={handleChange}
          name="capacity"
          type="text"
          id="outlined-basic 5"
          label="Kapasitet"
          variant="outlined"
          className={classes.half}
        />
      </div>
      <div>
        <TextField
          onChange={handleChange}
          name="description"
          type="text"
          multiline
          rows="4"
          id="outlined-multiline-static 6"
          label="Beskrivelse"
          variant="outlined"
          className={classes.descrField}
        />
      </div>
      <Autocomplete
        className={classes.autocompleteField}
        multiple
        id="amenities"
        options={props.amenities}
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
        onClick={props.addRoom ? addRoom : editRoom}
      >
        {props.addRoom ? 'Lag nytt rom' : 'Endre rommet'}
      </Button>
    </form>
  );
};

export default RoomEditor;
