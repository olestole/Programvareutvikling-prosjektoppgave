import React, { Component } from 'react';
import Room from '../components/Room';
import { makeStyles } from '@material-ui/core/styles';

// import Layout from "./Layout";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    maxWidth: 345
  }
});

export default function Roomlist() {
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
}
