import React from 'react';

import Homepage from '../components/Homepage';
import Navbar from '../components/Navbar';
// import Datepicker from '../components/Datepicker';
// import Numberselect from '../components/Numberselect';
import FindRoom from '../components/FindRoom';

export default function Index() {
  return (
    <div>
      <Navbar />
      <Homepage />
      <FindRoom />
    </div>
  );
}
