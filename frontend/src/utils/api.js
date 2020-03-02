import config from '../../config/env';

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
