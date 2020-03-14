import React from 'react';

import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm';

const Index = ({ query }) => {
  return (
    <Layout backgroundImage={'NewYork2.jpg'}>
      <LoginForm inBooking={query.inBooking} />
    </Layout>
  );
};

Index.getInitialProps = ({ query }) => {
  console.log(query);
  return { query };
};

export default Index;
