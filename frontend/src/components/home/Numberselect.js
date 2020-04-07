import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    height: '4em'
  }
});

const NumberSelect = props => {
  const classes = useStyles();

  const handleInput = e => {
    e.preventDefault();
    const re = /^\d+$/;
    if (re.test(e.target.value)) {
      props.setNumber(e.target.value);
    } else {
      return;
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="outlined-number"
          label="Antall"
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
          onChange={handleInput}
        />
      </div>
    </form>
  );
};

export default NumberSelect;
