import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = props => {
  const [user, setUser] = useState({
    id: 0,
    email: '',
    accessToken: '',
    refreshToken: '',
    loggedIn: false,
    is_staff: false,
    booking: {
      from_date: '',
      to_date: '',
      people: '',
      rom_id: null
    },
    customer: {
      email: '',
      first_name: '',
      last_name: '',
      address: {
        street_name: '',
        street_number: 0,
        city: '',
        postal_code: 0,
        country: ''
      }
    },
    bookedRoom: {
      id: null,
      from_date: '',
      to_date: '',
      booking_reference: '',
      comment: '',
      room: {
        id: null,
        room_number: null,
        title: '',
        description: '',
        price: '',
        capacity: 4
      }
    }
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export { UserContext };
