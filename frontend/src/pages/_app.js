import React from 'react';
import UserProvider from '../components/UserProvider';
import { SWRConfig } from 'swr';
import fetch from 'isomorphic-unfetch';

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        suspense: true,
        fetcher: (...args) => fetch(...args).then(r => r.json())
      }}
    >
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </SWRConfig>
  );
}

export default MyApp;
