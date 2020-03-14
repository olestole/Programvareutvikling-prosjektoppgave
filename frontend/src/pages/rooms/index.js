import React from 'react';
import fetch from 'isomorphic-unfetch';

import Layout from '../../components/Layout';
import Roomlist from '../../components/Roomlist';
import config from '../../../config/env';

const Rooms = props => {
  return (
    <Layout position={'fixed'} overflowY={'scroll'} width={'100%'}>
      <Roomlist rooms={props.rooms} />
    </Layout>
  );
};

Rooms.getInitialProps = async props => {
  const { query } = props;
  const res = await fetch(
    `${config.serverUrl}/rooms/?${query.from_date &&
      'from_date=' + query.from_date}${query.to_date &&
      '&to_date=' + query.to_date}${query.people && '&people=' + query.people}`
  );
  const json = await res.json();
  return { rooms: json };
};

export default Rooms;
