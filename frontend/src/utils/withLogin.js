import React from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import { loginWithToken } from './api';

export const logout = () => {
  cookie.remove('token');
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now());
  Router.push('/login');
};

const withAuthSync = WrappedComponent => {
  const Wrapper = props => <WrappedComponent {...props} />;

  Wrapper.getInitialProps = async ctx => {
    const { fancyhotellAuth } = nextCookie(ctx);

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    let userData;
    if (fancyhotellAuth) {
      userData = await loginWithToken(fancyhotellAuth);
      console.log(userData);
    }
    return { ...componentProps, user: userData, token: fancyhotellAuth };
  };

  return Wrapper;
};

export default withAuthSync;
