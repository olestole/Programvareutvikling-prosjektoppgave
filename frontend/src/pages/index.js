import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FindRoom from '../components/FindRoom';
import Layout from '../components/Layout';

import withLogin from '../utils/withLogin';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const Index = props => {
  const classes = useStyles();
  return (
    <Layout overflowY={'scroll'} {...props}>
      <div className={classes.container}>
        <FindRoom />
      </div>
    </Layout>
  );
};

export default withLogin(Index);
