import React from 'react';
import Layout from '../../components/Layout';
import Roomlist from '../../components/Roomlist';
import { getReq } from '../../utils/api';

const Rooms = props => {
  return (
    <Layout position={'fixed'} overflowY={'scroll'} width={'100%'}>
      <Roomlist rooms={props.rooms} />
    </Layout>
  );
};

Rooms.getInitialProps = async props => {
  const { query } = props;
  const res = await getReq(
    `rooms/?${query.from_date &&
      'from_date=' + query.from_date}${query.to_date &&
      '&to_date=' + query.to_date}${query.people && '&people=' + query.people}`
  );
  return { rooms: res };
};

export default Rooms;
