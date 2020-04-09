import React from 'react';
import { getRoomById } from '../../utils/api';
import BookRoom from '../../components/bookRoom';
import Layout from '../../components/shared/Layout';
import NotFound from '../../components/shared/NotFound';
import withLogin from '../../utils/withLogin';

const RoomPage = ({ room, ...props }) => {
  return (
    <Layout {...props} position={'fixed'} overflowY={'scroll'} width={'100%'}>
      {room.id ? <BookRoom room={room} /> : <NotFound />}
    </Layout>
  );
};

RoomPage.getInitialProps = async ({ query }) => {
  console.log(query);
  const room = await getRoomById(query.room_id);
  return { room };
};

export default withLogin(RoomPage);
