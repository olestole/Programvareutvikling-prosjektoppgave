import React from 'react';
import Room from '../components/Room';
import { makeStyles } from '@material-ui/core/styles';

// import Layout from "./Layout";
// Styles for the Roomlist container
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    maxWidth: '60%',
    marginLeft: '15%'
  }
});

const Roomlist = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Room />
      <Room />
      <Room />
      <Room />
      <Room />
      <Room />
    </div>
  );
};

export default Roomlist;
