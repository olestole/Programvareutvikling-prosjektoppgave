import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from './UserProvider';
import config from '../../config/env';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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

const RegisterUser = () => {
  const classes = useStyles();
  // const router = useRouter();
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
    console.log(regState);

    context.setUser({
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

    const rawResponse = await fetch(`${config.serverUrl}users/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const status = rawResponse.status;
    const content = await rawResponse.json();

    if (status === 401) {
      console.log("Couldn't find user");
    } else {
      console.log(content);
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
          label="New Email"
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
          label="New Password"
          variant="outlined"
          className={classes.half}
        />
        <TextField
          name="reenterPassword"
          type="password"
          onChange={handleChange}
          id="outlined-basic 3"
          label="Re-enter Password"
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
          label="Name"
          variant="outlined"
          className={classes.half}
        />
        <TextField
          onChange={handleChange}
          name="newLastName"
          type="text"
          id="outlined-basic 5"
          label="Last Name"
          variant="outlined"
          className={classes.half}
        />
      </div>
      <div>
        <TextField
          onChange={handleChange}
          name="newPhone"
          type="tel"
          id="outlined-basic 6"
          label="Phone number"
          variant="outlined"
          className={classes.half}
        />
      </div>
      <div>
        <TextField
          onChange={handleChange}
          name="newCountry"
          type="country"
          id="outlined-basic 7"
          label="Country"
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
          label="City"
          variant="outlined"
          className={classes.third}
        />
      </div>
      <div>
        <TextField
          onChange={handleChange}
          name="newAdress"
          id="outlined-basic 10"
          label="Adress"
          variant="outlined"
          className={classes.twoThird}
        />
        <TextField
          onChange={handleChange}
          name="newAdressNumber"
          id="outlined-basic 11"
          label="House number"
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
