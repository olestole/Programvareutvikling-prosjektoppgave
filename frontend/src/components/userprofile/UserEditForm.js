import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../shared/UserProvider';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { putReq } from '../../utils/api';

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

const UserEditForm = ({ handleUserChange }) => {
  const classes = useStyles();
  const context = useContext(UserContext);

  const [regState, setRegState] = useState({
    email: '',
    password: '',
    reenterPassword: '',
    phone: '',
    street_name: '',
    first_name: '',
    last_name: '',
    country: '',
    postal_code: '',
    city: '',
    street_number: ''
  });

  const handleChange = e => {
    e.preventDefault();
    setRegState({
      ...regState,
      [e.target.name]: e.target.value
    });
  };

  const addUser = async () => {
    // CREATE BODY TO POST THE NEW USER TO BACKEND
    const body = {
      email: context.user.customer.email,
      customer: {
        email: context.user.customer.email,
        first_name: context.user.customer.first_name,
        last_name: context.user.customer.last_name,
        phone: context.user.customer.phone,
        address: {
          street_name: context.user.customer.address.street_name,
          street_number: context.user.customer.address.street_number,
          city: context.user.customer.address.city,
          postal_code: context.user.customer.address.postal_code,
          country: context.user.customer.address.country
        }
      }
    };

    const addressList = [
      'street_name',
      'street_number',
      'city',
      'postal_code',
      'country'
    ];

    // We have a pretty weird usermodel with duplicate fields and so on, so this makes sure everything is updated correctly
    for (var key in regState) {
      if (!regState[key] == '') {
        if (addressList.includes(key)) {
          body.customer.address[key] = regState[key];
        } else if (key == 'email') {
          body.customer[key] = regState[key];
          body[key] = regState[key];
        } else {
          body.customer[key] = regState[key];
        }
      }
    }

    // POST THE NEW USER TO BACKEND
    const res = await putReq(
      body,
      `users/${context.user.id}/`,
      context.user.accessToken
    );

    // Set the edited user to context, so that it visually updates the page with new info
    context.setUser({
      ...context.user,
      email: body.email,
      customer: body.customer
    });

    if (res) {
      handleUserChange();
    } else {
      // Error when the user already exists, change this with custom error-message later
      alert('Something went wrong😶');
    }
  };

  return (
    <form className={classes.container}>
      <div className={classes.section}>
        <TextField
          fullWidth
          onChange={handleChange}
          name="email"
          id="outlined-basic 1"
          label="E-post"
          variant="outlined"
          className={classes.full}
        />
      </div>
      <div className={classes.div1}>
        <TextField
          onChange={handleChange}
          name="first_name"
          type="text"
          id="outlined-basic 4"
          label="Fornavn"
          variant="outlined"
          className={classes.third}
        />
        <TextField
          onChange={handleChange}
          name="last_name"
          type="text"
          id="outlined-basic 5"
          label="Etternavn"
          variant="outlined"
          className={classes.third}
        />
        <TextField
          onChange={handleChange}
          name="phone"
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
          name="country"
          type="country"
          id="outlined-basic 7"
          label="Land"
          variant="outlined"
          className={classes.third}
        />
        <TextField
          onChange={handleChange}
          name="postal_code"
          type="text"
          id="outlined-basic 8"
          label="Zip"
          pattern="[0-9]*"
          variant="outlined"
          className={classes.third}
        />
        <TextField
          onChange={handleChange}
          name="city"
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
          name="street_name"
          id="outlined-basic 10"
          label="Gateaddresse"
          variant="outlined"
          className={classes.twoThird}
        />
        <TextField
          onChange={handleChange}
          name="street_number"
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
        Oppdater bruker
      </Button>
    </form>
  );
};

export default UserEditForm;
