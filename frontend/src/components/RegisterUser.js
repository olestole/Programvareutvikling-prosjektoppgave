import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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

const RegisterUser = props => {
  const classes = useStyles();

  const handleChange = e => {
    props.registerForm(e.target.name, e.target.value);
  };

  return (
    <form className={classes.container}>
      <div className={classes.section}>
        <TextField
          fullWidth
          onChange={handleChange}
          name="newEmail"
          id="outlined-basic"
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
          id="outlined-basic"
          label="New Password"
          variant="outlined"
          className={classes.half}
        />
        <TextField
          name="reenterPassword"
          type="password"
          onChange={handleChange}
          id="outlined-basic"
          label="Re-enter Password"
          variant="outlined"
          className={classes.half}
        />
      </div>
      <div className={classes.div1}>
        <TextField
          onChange={handleChange}
          name="newName"
          type="text"
          id="outlined-basic"
          label="Name"
          variant="outlined"
          className={classes.half}
        />
        <TextField
          onChange={handleChange}
          name="newPhone"
          type="tel"
          id="outlined-basic"
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
          id="outlined-basic"
          label="Country"
          variant="outlined"
          className={classes.third}
        />
        <TextField
          onChange={handleChange}
          name="newZip"
          type="text"
          id="outlined-basic"
          label="Zip"
          pattern="[0-9]*"
          variant="outlined"
          className={classes.third}
        />
        <TextField
          onChange={handleChange}
          name="newCity"
          type="text"
          id="outlined-basic"
          label="City"
          variant="outlined"
          className={classes.third}
        />
      </div>
      <div>
        <TextField
          onChange={handleChange}
          name="newAdress"
          id="outlined-basic"
          label="Adress"
          variant="outlined"
          className={classes.twoThird}
        />
        <TextField
          onChange={handleChange}
          name="newAdressNumber"
          id="outlined-basic"
          label="House number"
          variant="outlined"
          className={classes.third}
        />
      </div>
    </form>
  );
};

export default RegisterUser;
