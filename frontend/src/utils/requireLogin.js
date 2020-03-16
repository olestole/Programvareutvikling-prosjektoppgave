import React, { useContext } from 'react';
import { UserContext } from '../components/UserProvider';
import LoginForm from '../components/LoginForm';

const RequireLogin = props => {
  const { user } = useContext(UserContext);
  const { children } = props;

  if (user.loggedIn) {
    return children;
  } else {
    return <LoginForm />;
  }
};

export default RequireLogin;
