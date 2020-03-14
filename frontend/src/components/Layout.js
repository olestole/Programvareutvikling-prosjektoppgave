import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../components/UserProvider';

import Navbar from '../components/Navbar';

const useStyles = makeStyles({
  root: props => ({
    height: '100vh',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    width: `${props.width || '100%'}`,
    backgroundImage: `url(${props.backgroundImage || '/NewYork.jpg'})`,
    position: `${props.position || null}`,
    overflowY: `${props.overflowY || null}`
  }),
  rootContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh'
  }
});

const Layout = props => {
  const classes = useStyles(props);

  const context = useContext(UserContext);
  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.rootContainer}>
        {React.Children.map(props.children, child =>
          React.cloneElement(child, { context: context })
        )}
      </div>
      <style jsx global>
        {`
          body {
            margin: 0;
            font-family: Roboto;
          }
          a {
            color: red;
            font-weight: 500;
            text-decoration: none;
          }
          a:visited {
            color: #b63030;
          }
        `}
      </style>
    </div>
  );
};

export default Layout;
