import React from 'react';
import fetch from 'isomorphic-unfetch';
// import config from '../../../config/env';

import Roomlist from '../../components/Roomlist';
import Navbar from '../../components/Navbar';

export default function Rooms(props) {
  return (
    <div>
      <Navbar />
      <Roomlist rooms={props.rooms} />
    </div>
  );
}

Rooms.getInitialProps = async () => {
  // const res = await fetch(`${config.serverUrl}/rooms/`);
  const res = await fetch(
    'https://secret-harbor-95265.herokuapp.com/api/rooms/'
  );
  const json = await res.json();
  return { rooms: json };
};
