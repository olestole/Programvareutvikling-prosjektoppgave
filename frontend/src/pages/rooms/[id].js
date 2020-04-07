import React from 'react';
import { getRoomById } from '../../utils/api';
import RoomDetail from '../../components/rooms/RoomDetail';
import Layout from '../../components/shared/Layout';
import NotFound from '../../components/shared/NotFound';
import withLogin from '../../utils/withLogin';

const RoomPage = ({ room, ...props }) => {
  return (
    <Layout {...props} position={'fixed'} overflowY={'scroll'} width={'100%'}>
      {room.id ? <RoomDetail room={room} /> : <NotFound />}
    </Layout>
  );
};

RoomPage.getInitialProps = async ({ query }) => {
  const room = await getRoomById(query.id);
  return { room };
};

export default withLogin(RoomPage);
