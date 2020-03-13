import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from './UserProvider';
import config from '../../config/env';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ErrorMsg from './ErrorMsg';

import { login } from '../utils/api';

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
  }
});

const RegisterUser = props => {
  const classes = useStyles();
  const router = useRouter();
  const context = useContext(UserContext);

  const [regState, setRegState] = useState({
    newEmail: '',
    newPassword: '',
    reenterPassword: '',
    newPhone: '',
    newAdress: '',
    newFirstName: '',
    newLastName: '',
    newCountry: '',
    newZip: '',
    newCity: '',
    newAdressNumber: ''
  });

  const handleChange = e => {
    e.preventDefault();
    setRegState({
      ...regState,
      [e.target.name]: e.target.value
    });
  };

  const addUser = async () => {
    await context.setUser({
      ...context.user,
      customer: {
        email: regState.newEmail,
        first_name: regState.newFirstName,
        last_name: regState.newLastName,
        password: regState.newPassword,
        address: {
          street_name: regState.newAdress,
          street_number: regState.newAdressNumber,
          city: regState.newCity,
          postal_code: regState.newZip,
          country: regState.newCountry
        }
      }
    });

    // CREATE BODY TO POST THE NEW USER TO BACKEND
    const body = {
      email: regState.newEmail,
      first_name: regState.newFirstName,
      last_name: regState.newLastName,
      phone: regState.newPhone,
      password: regState.newPassword,
      address: {
        street_name: regState.newAdress,
        street_number: regState.newAdressNumber,
        city: regState.newCity,
        postal_code: regState.newZip,
        country: regState.newCountry
      }
    };

    // POST THE NEW USER TO BACKEND
    const rawResponse = await fetch(`${config.serverUrl}/users/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const status = rawResponse.status;
    const content = await rawResponse.json();

    if (status == 200) {
      // LOGIN WITH THE NEW USER AND ROUTE TO EITHER '/' OR '/ROOMS'
      if (props.inBooking == 'true') {
        login(body, context, router, '/rooms');
      } else {
        login(body, context, router, '/');
      }
    } else {
      // Error when the user already exists, change this with custom error-message later
      console.log(content.email[0]);
      alert('Email already exists😟');
    }
  };

  return (
    <form className={classes.container}>
      <div className={classes.section}>
        <TextField
          fullWidth
          onChange={handleChange}
          name="newEmail"
          id="outlined-basic 1"
          label="E-post"
          variant="outlined"
          className={classes.full}
        />
      </div>
      <div className={classes.section}>
        <TextField
          name="newPassword"
          type="password"
          onChange={handleChange}
          id="outlined-basic 2"
          label="Passord"
          variant="outlined"
          className={classes.half}
        />
        <TextField
          name="reenterPassword"
          type="password"
          onChange={handleChange}
          id="outlined-basic 3"
          label="Bekreft passord"
          variant="outlined"
          className={classes.half}
        />
      </div>
      <div className={classes.div1}>
        <TextField
          onChange={handleChange}
          name="newFirstName"
          type="text"
          id="outlined-basic 4"
          label="Fornavn"
          variant="outlined"
          className={classes.third}
        />
        <TextField
          onChange={handleChange}
          name="newLastName"
          type="text"
          id="outlined-basic 5"
          label="Etternavn"
          variant="outlined"
          className={classes.third}
        />
        <TextField
          onChange={handleChange}
          name="newPhone"
          type="tel"
          id="outlined-basic 6"
          label="Telefon nummer"
          variant="outlined"
          className={classes.third}
        />
      </div>
      <div>
        <TextField
          onChange={handleChange}
          name="newCountry"
          type="country"
          id="outlined-basic 7"
          label="Land"
          variant="outlined"
          className={classes.third}
        />
        <TextField
          onChange={handleChange}
          name="newZip"
          type="text"
          id="outlined-basic 8"
          label="Zip"
          pattern="[0-9]*"
          variant="outlined"
          className={classes.third}
        />
        <TextField
          onChange={handleChange}
          name="newCity"
          type="text"
          id="outlined-basic 9"
          label="By"
          variant="outlined"
          className={classes.third}
        />
      </div>
      <div>
        <TextField
          onChange={handleChange}
          name="newAdress"
          id="outlined-basic 10"
          label="Gateaddresse"
          variant="outlined"
          className={classes.twoThird}
        />
        <TextField
          onChange={handleChange}
          name="newAdressNumber"
          id="outlined-basic 11"
          label="Hus nummer"
          variant="outlined"
          className={classes.third}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        className={classes.regBtn}
        onClick={addUser}
      >
        Lag ny bruker
      </Button>
    </form>
  );
};

export default RegisterUser;
