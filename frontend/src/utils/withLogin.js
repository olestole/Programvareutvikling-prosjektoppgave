import React from 'react';
import nextCookie from 'next-cookies';
import { loginWithToken } from './api';

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
    }
    return { ...componentProps, user: userData, token: fancyhotellAuth };
  };

  return Wrapper;
};

export default withAuthSync;
