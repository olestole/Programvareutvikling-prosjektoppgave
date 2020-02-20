import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = props => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    token: ''
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export { UserContext };
