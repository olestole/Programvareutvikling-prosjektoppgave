import React from 'react';
import FindRoom from '../components/home/FindRoom';
import Layout from '../components/shared/Layout';

import withLogin from '../utils/withLogin';

const Index = props => {
  return (
    <Layout overflowY={'scroll'} {...props}>
      <FindRoom />
    </Layout>
  );
};

export default withLogin(Index);
