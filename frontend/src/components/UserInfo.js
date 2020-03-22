import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { UserContext } from './UserProvider';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Avatar from './Avatar';
import UserEditForm from '../components/UserEditForm';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    padding: '40px',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px'
  },
  listItem: {
    margin: '5px'
  }
});

const userForm = makeStyles({});

const UserInfo = () => {
  const classes = useStyles();
  const formStyles = userForm();
  const { user } = useContext(UserContext);
  const [showForm, setShowForm] = useState(false);

  const address = user.customer.address;
  const name = `${user.customer.first_name} ${user.customer.last_name}`;

  const handleUserChange = () => setShowForm(true);

  const RenderForm = () =>
    showForm ? (
      <UserEditForm />
    ) : (
      <Button
        className={classes.listItem}
        variant="contained"
        color="primary"
        onClick={handleUserChange}
      >
        ENDRE BRUKERINFO
      </Button>
    );

  return (
    <Paper elevation={3} className={classes.container}>
      <div className={classes.column}>
        <h1 className={classes.listItem}>{name.toUpperCase()}</h1>
        <h4 className={classes.listItem}>{user.email.toUpperCase()}</h4>
        <h4 className={classes.listItem}>{user.customer.phone}</h4>
        <br />
        <h4 className={classes.listItem}>
          {address.street_name} {address.street_number}
        </h4>
        <h4 className={classes.listItem}>
          {address.city}, {address.postal_code}
        </h4>
        <h4 className={classes.listItem}>{address.country}</h4>
        <br />
        <RenderForm />
      </div>
      <div className={classes.column}>
        <Avatar
          size="12"
          letter={user.loggedIn ? user.email[0].toUpperCase() : null}
          color={user.loggedIn ? 'purple' : null}
        />
      </div>
      <div></div>
    </Paper>
  );
};

export default UserInfo;
