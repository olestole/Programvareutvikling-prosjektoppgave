import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
// import Image from '../../static/NewYork.jpg';

export default function Homepage() {
  return (
    <div>
      <section
        styles={{
          backgroundImage: `url(${'https://www.elsetge.cat/imagepost/b/107/1075736_new-york-city-4k-wallpaper.jpg'})`
        }}
      ></section>
    </div>
  );
}
