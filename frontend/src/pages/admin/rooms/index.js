import React, { useContext } from 'react';
import Layout from '../../../components/shared/Layout';
import BookedRoomList from '../../../components/admin/BookedRoomList';
import { getReq } from '../../../utils/api';
import { UserContext } from '../../../components/shared/UserProvider';
import withLogin from '../../../utils/withLogin';
import useSWR from 'swr';

const Rooms = props => {
  const { user } = useContext(UserContext);
  const { data } = useSWR(
    user.accessToken ? ['admin/rooms/', user.accessToken] : null,
    url => getReq(url, user.accessToken)
  );
  console.log(user);
  const rooms = data;
  console.log(user);

  return (
    <Layout position={'fixed'} overflowY={'scroll'} width={'100%'} {...props}>
      {rooms && rooms.length > 0 ? (
        <>
          <BookedRoomList amenities={props.amenities} rooms={rooms} accessToken={user.accessToken} />
        </>
      ) : (
        <div>Ingen rom</div>
      )}
    </Layout>
  );
};

Rooms.getInitialProps = async () => {
  const amenities = await getReq('rooms/amenities/');
  console.log("Passed amenities from index.js")
  console.log(amenities)

  return { amenities };
};

export default withLogin(Rooms);
