import { useRouter } from 'react';

import config from '../../config/env';
import { trackPromise } from 'react-promise-tracker';

export const logInWithData = async body => {
  const rawResponse = await fetch(`${config.serverUrl}/token/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const tokenData = await rawResponse.json();

  const userRes = await fetch(`${config.serverUrl}/users/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + tokenData.access
    }
  });

  const userData = await userRes.json();
  return {
    token: tokenData,
    user: userData[0]
  };
};

export const loginWithIndicator = body => {
  return trackPromise(logInWithData(body));
};

export const login = async (body, context, router, routerURL) => {
  // Log in to the api
  const { token, user } = await loginWithIndicator(body);

  if (!user) {
    alert("Couldn't find user😔");
  } else {
    await context.setUser({
      ...context.user,
      email: user.email,
      accessToken: token.access,
      refreshToken: token.refresh,
      loggedIn: true,
      customer: user.customer
    });
    router.push(routerURL);
  }
};
