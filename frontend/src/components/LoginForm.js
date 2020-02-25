import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from './UserProvider';
import { useRouter } from 'next/router';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import RegisterUser from './RegisterUser';
import config from '../../config/env';

// import login from '../../utils/fetcher';

const useStyles = makeStyles({
  root: {
    padding: '40px'
  },
  div: {
    height: '4em',
    margin: '5px'
  },
  regBtn: {
    width: `calc(100% - 10px)`,
    margin: '5px'
  },
  divider: {
    margin: '1em 0 2em 0'
  }
});

const LoginForm = () => {
  const router = useRouter();
  const context = useContext(UserContext);

  const classes = useStyles();
  const [state, setState] = useState({
    email: '',
    password: ''
  });
  const [alreadyUser, setUserLogin] = useState(false);

  const [regState, setRegState] = useState({
    newEmail: '',
    newPassword: '',
    reenterPassword: '',
    newPhone: '',
    newAdress: '',
    newName: ''
  });

  const handleChange = e => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleNewUser = () => {
    setUserLogin(true);
  };

  const handleRegisterChange = (name, value) => {
    setRegState({
      ...regState,
      [name]: value
    });
  };

  const addUser = () => {
    console.log(regState);
  };

  const handleLogin = () => {
    const body = {
      username: state.email,
      password: state.password
    };

    (async () => {
      const rawResponse = await fetch(`${config.serverUrl}/token/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const status = rawResponse.status;
      const content = await rawResponse.json();

      console.log(status);
      console.log(content.access, content.refresh);

      if (status === 401) {
        console.log("Couldn't find user");
      } else {
        context.setUser({
          username: state.email,
          accessToken: content.access,
          refreshToken: content.refresh,
          loggedIn: true
        });
        router.push('/');
      }
    })();
  };

  const renderRegister = () => {
    return alreadyUser ? (
      <div>
        <RegisterUser registerForm={handleRegisterChange} />
        <Button
          variant="contained"
          color="primary"
          className={classes.regBtn}
          onClick={addUser}
        >
          Lag ny bruker
        </Button>
      </div>
    ) : (
      <Button
        className={classes.regBtn}
        variant="outlined"
        color="primary"
        onClick={handleNewUser}
      >
        Do not have a user yet
      </Button>
    );
  };

  return (
    <div>
      <form>
        <Paper elevation={5} className={classes.root}>
          <TextField
            onChange={handleChange}
            name="email"
            type="email"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            className={classes.div}
          />
          <TextField
            name="password"
            type="password"
            onChange={handleChange}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            className={classes.div}
          />
          <Button
            variant="outlined"
            color="secondary"
            className={classes.div}
            onClick={handleLogin}
          >
            Logg inn
          </Button>
          <Divider variant="middle" className={classes.divider} />
          {renderRegister()}
        </Paper>
      </form>
    </div>
  );
};

export default LoginForm;
