import React, { useContext } from 'react';
import { UserContext } from '../components/shared/UserProvider';
import LoginForm from '../components/login/LoginForm';

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
