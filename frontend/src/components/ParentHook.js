import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

export default function ContainedButtons() {
  const classes = useStyles();
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');

  const handleClick = () => {
    setCount(count + 1);
  };

  const handleChange = e => {
    e.preventDefault();
    setInput(e.target.value);
  };

  return (
    <div className={classes.root}>
      <TextField
        type="text"
        placeholder="Enter text..."
        onChange={handleChange}
        id="outlined-basic"
        label="Text"
        variant="outlined"
      />
      <Button variant="contained" color="primary" onClick={handleClick}>
        Primary
      </Button>
      <h1>{count}</h1>
      <h3>{input}</h3>
    </div>
  );
}
