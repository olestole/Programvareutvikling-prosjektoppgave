import { useContext } from 'react';
import { UserContext } from '../src/components/UserProvider';

const context = useContext(UserContext);

const request = (url, data) => {
  fetch(url, {
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
