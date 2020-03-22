import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import UserInfo from '../components/UserInfo';
import Layout from '../components/Layout';
import withLogin from '../utils/withLogin';
import RequireLogin from '../utils/requireLogin';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const MyPage = () => {
  const classes = useStyles();
  return (
    <Layout overflowY={'scroll'}>
      <RequireLogin>
        <div className={classes.container}>
          <UserInfo />
        </div>
      </RequireLogin>
    </Layout>
  );
};

export default withLogin(MyPage);
