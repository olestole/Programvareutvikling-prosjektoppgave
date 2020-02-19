import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    margin: '0 0 0 0px'
  }
});

export default function FormPropsTextFields() {
  const classes = useStyles();

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
        />
      </div>
    </form>
  );
}
