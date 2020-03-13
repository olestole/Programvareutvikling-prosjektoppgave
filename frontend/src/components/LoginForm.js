import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from './UserProvider';
import { useRouter } from 'next/router';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import RegisterUser from './RegisterUser';
import { login } from '../utils/api';

import LoadingSpinner from './LoadingSpinner';

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
  },
  float: {
    position: 'absolute',
    left: '50%',
    top: '50%'
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

  const handleChange = e => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleNewUser = () => {
    setUserLogin(true);
  };

  const handleLogin = async () => {
    const body = {
      email: state.email,
      password: state.password
    };

    login(body, context, router, '/');
  };

  const RenderRegister = () => {
    return alreadyUser ? (
      <RegisterUser />
    ) : (
      <Button
        className={classes.regBtn}
        variant="outlined"
        color="primary"
        onClick={handleNewUser}
      >
        Jeg har ikke en bruker
      </Button>
    );
  };

  return (
    <div>
      <form>
        <div className={classes.root}>
          <TextField
            onChange={handleChange}
            name="email"
            type="email"
            id="outlined-basic"
            label="E-post"
            variant="outlined"
            className={classes.div}
          />
          <TextField
            name="password"
            type="password"
            onChange={handleChange}
            id="outlined-basic"
            label="Passord"
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
          <RenderRegister />
          <div className={classes.float}>
            <LoadingSpinner />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
