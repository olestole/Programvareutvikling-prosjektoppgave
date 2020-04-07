import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from './UserProvider';
import Navbar from './Navbar';

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
  rootContainer: ({ noCenter }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: noCenter || 'center',
    height: 'auto',
    minHeight: '90vh'
  })
});

const Layout = props => {
  const classes = useStyles(props);

  const context = useContext(UserContext);

  if (props.user && props.user[0] && !context.user.loggedIn) {
    const user = props.user[0];
    context.setUser({
      ...context.user,
      email: user.email,
      accessToken: props.token,
      loggedIn: true,
      customer: user.customer
    });
  }
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
