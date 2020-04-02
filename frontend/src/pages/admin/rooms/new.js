import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Layout from '../../../components/Layout';
import RoomEditor from '../../../components/RoomEditor.js';
import withLogin from '../../../utils/withLogin';
import RequireLogin from '../../../utils/requireLogin';
import { getReq } from '../../../utils/api';

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
      <RequireLogin>
        <Paper elevation={3} className={classes.container}>
          <RoomEditor amenities={props.amenities} />
        </Paper>
      </RequireLogin>
    </Layout>
  );
};

Index.getInitialProps = async ctx => {
  const amenities = await getReq('rooms/amenities/');
  return { amenities };
};

export default withLogin(Index);
