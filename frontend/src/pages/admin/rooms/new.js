import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Layout from '../../../components/Layout';
import RoomEditor from '../../../components/RoomEditor.js';

const useStyles = makeStyles({
  container: {
    justifyContent: 'center',
    width: '90%',
    paddingBottom: '30px'
  }
});

const Index = props => {
  const classes = useStyles();

  return (
    <Layout backgroundImage={'NewYork2.jpg'} overflowY="scroll" {...props}>
      <Paper elevation={3} className={classes.container}>
        <RoomEditor />
      </Paper>
    </Layout>
  );
};

export default Index;
