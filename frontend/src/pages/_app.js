import React from 'react';
import UserProvider from '../components/UserProvider';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;
