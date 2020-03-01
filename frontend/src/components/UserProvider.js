import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = props => {
  const [user, setUser] = useState({
    username: '',
    accessToken: '',
    refreshToken: '',
    loggedIn: false,
    booking: {
      from_date: '',
      to_date: '',
      people: ''
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
