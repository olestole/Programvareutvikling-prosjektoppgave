import config from '../../config/env';
import { trackPromise } from 'react-promise-tracker';

// POST REQUEST
export const postReq = (body, endpoint, accessToken) => {
  if (!accessToken) {
    return fetch(`${config.serverUrl}/${endpoint}/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  } else {
    return fetch(`${config.serverUrl}/${endpoint}/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
      },
      body: JSON.stringify(body)
    });
  }
};

//GET REQUEST
export const getReq = (accessToken, endpoint) =>
  fetch(`${config.serverUrl}/${endpoint}/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    }
  });

// LOGIN WITH USERINFO
export const logInWithData = async body => {
  const tokenResponse = await postReq(body, 'token', null);
  const tokenData = await tokenResponse.json();
  const userResponse = await getReq(tokenData.access, 'users');
  const userData = await userResponse.json();

  sessionStorage.setItem('jwtToken', tokenData.access);

  return {
    token: tokenData,
    user: userData[0]
  };
};

// LOGIN WITH INDICATOR
export const loginWithIndicator = body => {
  return trackPromise(logInWithData(body));
};

// LOGIN AND VALIDATE IF IT'S A VALID USER-LOGIN
export const login = async (body, context, router, routerURL) => {
  const { token, user } = await loginWithIndicator(body);

  if (!user) {
    // Change this with custom error-message later
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

export const getBookings = async ({ user }) => {
  const rawResponse = await fetch(`${config.serverUrl}/bookings/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + user.tokenData.access
    }
  });
  const data = await rawResponse.json();
  return data;
};
