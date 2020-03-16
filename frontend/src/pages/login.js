import React from 'react';

import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm';

const Index = () => {
  return (
    <Layout backgroundImage={'NewYork2.jpg'}>
      <LoginForm redirect="/" />
    </Layout>
  );
};

Index.getInitialProps = ({ query }) => {
  console.log(query);
  return { query };
};

export default Index;
