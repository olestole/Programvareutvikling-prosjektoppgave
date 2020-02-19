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
  }
});

const RegisterUser = props => {
  const classes = useStyles();

  const handleChange = e => {
    props.registerForm(e.target.name, e.target.value);
  };

  return (
    <div>
      <form>
        <TextField
          onChange={handleChange}
          name="newEmail"
          id="outlined-basic"
          label="New Email"
          variant="outlined"
          className={classes.ownLine}
        />
      </form>
      <form>
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
      </form>
      <form>
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
      </form>
      <form>
        <TextField
          onChange={handleChange}
          name="newAdress"
          id="outlined-basic"
          label="Adress"
          variant="outlined"
          className={classes.ownLine}
        />
      </form>
    </div>
  );
};

export default RegisterUser;
