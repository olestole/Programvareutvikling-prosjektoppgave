import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  div: {
    height: '4em',
    margin: '5px',
    width: `calc(50% - 10px)`
  },
  ownLine: {
    width: `calc(100% - 10px)`,
    margin: '5px'
  },
  third: {
    height: '4em',
    margin: '5px',
    widht: 'calc(32% - 10px)'
  }
});

const RegisterUser = props => {
  const classes = useStyles();

  const handleChange = e => {
    props.registerForm(e.target.name, e.target.value);
  };

  return (
    <form>
      <div>
        <TextField
          onChange={handleChange}
          name="newEmail"
          id="outlined-basic"
          label="New Email"
          variant="outlined"
          className={classes.ownLine}
        />
      </div>
      <div>
        <TextField
          name="newPassword"
          type="password"
          onChange={handleChange}
          id="outlined-basic"
          label="New Password"
          variant="outlined"
          className={classes.div}
        />
        <TextField
          name="reenterPassword"
          type="password"
          onChange={handleChange}
          id="outlined-basic"
          label="Re-enter Password"
          variant="outlined"
          className={classes.div}
        />
      </div>
      <div>
        <TextField
          onChange={handleChange}
          name="newName"
          type="text"
          id="outlined-basic"
          label="Name"
          variant="outlined"
          className={classes.div}
        />
        <TextField
          onChange={handleChange}
          name="newPhone"
          type="tel"
          id="outlined-basic"
          label="Phone number"
          variant="outlined"
          className={classes.div}
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
          className={classes.ownLine}
        />
      </div>
    </form>
  );
};

export default RegisterUser;
