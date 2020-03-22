import config from '../../config/env';
import { trackPromise } from 'react-promise-tracker';
import fetch from 'isomorphic-unfetch';
import cookie from 'js-cookie';

// POST REQUEST
export const postReq = (body, endpoint, accessToken) => {
  if (!accessToken) {
    return fetch(`${config.serverUrl}/${endpoint}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(r => r.json());
  } else {
    return fetch(`${config.serverUrl}/${endpoint}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
      },
      body: JSON.stringify(body)
    }).then(r => r.json());
  }
};

//GET REQUEST
export const getReq = (endpoint, accessToken) =>
  accessToken
    ? fetch(`${config.serverUrl}/${endpoint}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken
        }
      }).then(r => r.json())
    : fetch(`${config.serverUrl}/${endpoint}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(r => r.json());

const storeToken = token => {
  cookie.set('fancyhotellAuth', token, { expires: 1 });
};

// DELETE REQUEST
export const deleteReq = (endpoint, accessToken) =>
  accessToken
    ? fetch(`${config.serverUrl}/${endpoint}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken
        }
      }).then(r => r.json())
    : fetch(`${config.serverUrl}/${endpoint}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(r => r.json());

// PUT REQUEST
export const putReq = (body, endpoint, accessToken) => {
  if (!accessToken) {
    return fetch(`${config.serverUrl}/${endpoint}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(r => r.json());
  } else {
    return fetch(`${config.serverUrl}/${endpoint}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
      },
      body: JSON.stringify(body)
    }).then(r => r.json());
  }
};

// LOGIN WITH USERINFO
export const logInWithData = async body => {
  const tokenData = await postReq(body, 'token/', null);
  const userData = await getReq('users/', tokenData.access);

  storeToken(tokenData.access);

  return {
    token: tokenData,
    user: userData[0]
  };
};

// LOGIN WITH TOKEN
export const loginWithToken = async token => {
  const userData = await getReq('users/', token);
  return userData;
};

// LOGIN WITH INDICATOR
export const loginWithIndicator = body => {
  return trackPromise(logInWithData(body));
};

// LOGIN AND VALIDATE IF IT'S A VALID USER-LOGIN
export const login = async (body, context) => {
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
    return true;
  }
};

export const logout = async context => {
  cookie.remove('fancyhotellAuth');
  context.setUser({
    ...context.user,
    email: '',
    accessToken: '',
    refreshToken: '',
    loggedIn: false,
    customer: {}
  });
};

export const getRoomById = async id => await getReq(`rooms/${id}/`);
