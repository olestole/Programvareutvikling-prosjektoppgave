import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import UserInfo from '../components/UserInfo';
import Layout from '../components/Layout';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default function Index() {
  const classes = useStyles();
  return (
    <Layout overflowY={'scroll'}>
      <div className={classes.container}>
        <UserInfo />
      </div>
    </Layout>
  );
}
