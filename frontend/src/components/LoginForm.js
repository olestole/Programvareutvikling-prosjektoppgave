import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from './UserProvider';
import { useRouter } from 'next/router';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import RegisterUser from './RegisterUser';
import { logInWithData } from '../utils/api';

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
  const [regState, setRegState] = useState({
    newEmail: '',
    newPassword: '',
    reenterPassword: '',
    newPhone: '',
    newAdress: '',
    newFirstName: '',
    newLastName: '',
    newCountry: '',
    newZip: '',
    newCity: '',
    newAdressNumber: ''
  });

  const [alreadyUser, setUserLogin] = useState(false);

  const handleChange = e => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleNewUser = () => {
    setUserLogin(true);
  };

  const handleRegisterChange = (name, value) => {
    console.log(name, value);
    setRegState({
      ...regState,
      [name]: value
    });
  };

  const addUser = () => {
    console.log(regState);
  };

  const handleLogin = async () => {
    const body = {
      email: state.email,
      password: state.password
    };

    // Log in to the api
    const { token, user } = await logInWithData(body);

    if (!user) {
      console.log("Couldn't find user");
    } else {
      await context.setUser({
        ...context.user,
        email: state.email,
        accessToken: token.access,
        refreshToken: token.refresh,
        loggedIn: true,
        customer: user.customer
      });
      router.push('/');
    }
  };

  const RenderRegister = () => {
    return alreadyUser ? (
      <div>
        <RegisterUser
          addUser={addUser}
          regState={regState}
          registerForm={handleRegisterChange}
        />
        {/* <Button
          variant="contained"
          color="primary"
          className={classes.regBtn}
          onClick={addUser}
        >
          Lag ny bruker
        </Button> */}
      </div>
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

  // console.log(loggedIn);

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
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
