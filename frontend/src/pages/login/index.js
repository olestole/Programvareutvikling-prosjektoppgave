import React from 'react';

import Layout from '../../components/shared/Layout';
import LoginForm from '../../components/login/LoginForm';

const Index = () => {
  return (
    <Layout backgroundImage={'NewYork2.jpg'}>
      <LoginForm redirect="/" />
    </Layout>
  );
};

export default Index;
