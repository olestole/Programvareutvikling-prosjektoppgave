import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Link from 'next/link';

// Check out https://gist.github.com/herr-vogel/0b5d4f3c28f08dc6cc4a2fd4f7b4a4df for Linking Buttons

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      // margin: theme.spacing(1),
      width: '98%'
    }
  }
}));

export default function OutlinedButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link href="/rooms">
        <Button variant="outlined" color="secondary">
          Finn ditt rom!
        </Button>
      </Link>
    </div>
  );
}
