import React from 'react';
import Roomlist from '../../components/Roomlist';
import fetch from 'isomorphic-unfetch';
// import config from '../../../config/env';

export default function Rooms(props) {
  return (
    <div>
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