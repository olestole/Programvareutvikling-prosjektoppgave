import config from '../config/env';

// URL/api/token - får token fra fetch
// Poster til /token med username og token.
// Objekt med 'acces' og 'refresh'

const login = (username, password) => {
  fetch(`${config.serverUrl}/token/`, {
    method: 'POST',
    body: JSON.stringify({
      username,
      password
    })
  }).then(res => {
    return res.data;
  });
};

export default login;
