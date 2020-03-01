import config from '../config/env';

const request = (url, data, context) => {
  fetch(config.serverUrl + url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + context.user.accessToken
    },
    body: JSON.stringify(data)
  }).then(res => {
    console.log(res);
  });
};

export default request;
