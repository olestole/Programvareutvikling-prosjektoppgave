import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from './UserProvider';
import { useRouter } from 'next/router';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
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
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
});

const LoginForm = props => {
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

  const handleLogin = async e => {
    e.preventDefault();
    const body = {
      email: state.email,
      password: state.password
    };

    const res = await login(body, context);
    if (props.redirect && res) {
      router.push(props.redirect);
    }
  };

  const RenderRegister = () => {
    return alreadyUser ? (
      <RegisterUser inBooking={props.inBooking} />
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
    <Paper elevation={3} className={classes.container}>
      <div className={classes.root}>
        <form onSubmit={handleLogin}>
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
            type="submit"
            className={classes.div}
          >
            Logg inn
          </Button>
          <Divider variant="middle" className={classes.divider} />
          <div className={classes.float}>
            <LoadingSpinner />
          </div>
        </form>
        <RenderRegister />
      </div>
    </Paper>
  );
};

export default LoginForm;
