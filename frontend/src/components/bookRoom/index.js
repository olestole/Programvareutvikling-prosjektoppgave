import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Container,
  Button,
  Typography,
  Divider,
  Stepper,
  Step,
  StepLabel,
  TextField
} from '@material-ui/core';
import Numberselect from '../home/Numberselect';
import { UserContext } from '../shared/UserProvider';
import { postReq } from '../../utils/api';
import RequireLogin from '../../utils/requireLogin';
import dayjs from 'dayjs';

const bookingStyles = makeStyles({
  root: {
    width: '94%',
    margin: 'auto',
    padding: '10px 20px'
  },
  dateWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center'
  },
  book: {
    width: '60%',
    marginTop: '20px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    textAlign: 'center'
  },
  bookButton: {
    backgroundColor: '#3f51b5',
    color: 'white',
    '&:hover': {
      backgroundColor: '#445bd8;'
    }
  },
  spacer: {
    height: '10px'
  },
  comment: {
    width: '100%',
    height: '100px'
  }
});
const ConfirmBooking = ({ room, booking, setBooking }) => {
  const classes = bookingStyles();

  return (
    <Container className={classes.root}>
      <Typography classnames={classes.title} variant="h5">
        Bekreft din booking
      </Typography>
      <div className={classes.spacer} />
      <Divider />
      <Typography variant="p">Rom: {room.title}</Typography>
      <div className={classes.spacer} />
      <Typography variant="p">Innsjekk: {booking.from_date}</Typography>
      <div className={classes.spacer} />
      <Typography variant="p">Utsjekk: {booking.to_date}</Typography>
      <div className={classes.spacer} />
      <div className={classes.spacer} />
      <div className={classes.spacer} />
      <Numberselect
        className={classes.dateLine}
        setNumber={n => setBooking({ ...booking, people: n })}
        value={booking.people}
      />
      <TextField
        className={classes.comment}
        variant="outlined"
        label="Kommentar"
        onChange={e => setBooking({ ...booking, comment: e.target.value })}
        placeholder="Skriv en kommentar til bookingen"
      />
      <Divider />
    </Container>
  );
};

const userStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  half: {
    height: '4em',
    margin: '5px',
    flexGrow: '1 1 0',
    width: `calc(50% - 10px)`
  },
  full: {
    width: `calc(100% - 10px)`,
    margin: '5px'
  },
  third: {
    height: '4em',
    margin: '5px',
    width: 'calc(33.3% - 10px)'
  },
  twoThird: {
    height: '4em',
    margin: '5px',
    width: 'calc(66.6% - 10px)'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    margin: '50px',
    padding: '20px'
  },
  button: {
    margin: '20px'
  }
});

const GetUserInfo = ({ setUser }) => {
  const classes = userStyles();

  const [useLogin, setUseLogin] = useState(null);

  const [regState, setRegState] = useState({
    newEmail: '',
    newPhone: '',
    newAdress: '',
    newFirstName: '',
    newLastName: '',
    newCountry: '',
    newZip: '',
    newCity: '',
    newAdressNumber: ''
  });

  const handleChange = e => {
    e.preventDefault();
    setRegState({
      ...regState,
      [e.target.name]: e.target.value
    });

    setUser({
      customer: {
        email: regState.newEmail,
        first_name: regState.newFirstName,
        last_name: regState.newLastName,
        password: regState.newPassword,
        address: {
          street_name: regState.newAdress,
          street_number: regState.newAdressNumber,
          city: regState.newCity,
          postal_code: regState.newZip,
          country: regState.newCountry
        }
      }
    });
  };

  return (
    <>
      {useLogin === null && (
        <div className={classes.buttons}>
          <Button
            size="large"
            variant="outlined"
            className={classes.button}
            onClick={() => setUseLogin(true)}
          >
            Logg inn med eksisterende bruker
          </Button>
          <Button
            size="large"
            variant="outlined"
            className={classes.button}
            onClick={() => setUseLogin(false)}
          >
            Skriv inn brukerinfo
          </Button>
        </div>
      )}
      {useLogin === true && <RequireLogin>Something went wrong</RequireLogin>}
      {useLogin === false && (
        <form className={classes.container}>
          <div className={classes.section}>
            <TextField
              fullWidth
              onChange={handleChange}
              name="newEmail"
              id="outlined-basic 1"
              label="E-post"
              variant="outlined"
              className={classes.full}
            />
          </div>
          <div className={classes.div1}>
            <TextField
              onChange={handleChange}
              name="newFirstName"
              type="text"
              id="outlined-basic 4"
              label="Fornavn"
              variant="outlined"
              className={classes.third}
            />
            <TextField
              onChange={handleChange}
              name="newLastName"
              type="text"
              id="outlined-basic 5"
              label="Etternavn"
              variant="outlined"
              className={classes.third}
            />
            <TextField
              onChange={handleChange}
              name="newPhone"
              type="tel"
              id="outlined-basic 6"
              label="Telefon nummer"
              variant="outlined"
              className={classes.third}
            />
          </div>
          <div>
            <TextField
              onChange={handleChange}
              name="newCountry"
              type="country"
              id="outlined-basic 7"
              label="Land"
              variant="outlined"
              className={classes.third}
            />
            <TextField
              onChange={handleChange}
              name="newZip"
              type="text"
              id="outlined-basic 8"
              label="Zip"
              pattern="[0-9]*"
              variant="outlined"
              className={classes.third}
            />
            <TextField
              onChange={handleChange}
              name="newCity"
              type="text"
              id="outlined-basic 9"
              label="By"
              variant="outlined"
              className={classes.third}
            />
          </div>
          <div>
            <TextField
              onChange={handleChange}
              name="newAdress"
              id="outlined-basic 10"
              label="Gateaddresse"
              variant="outlined"
              className={classes.twoThird}
            />
            <TextField
              onChange={handleChange}
              name="newAdressNumber"
              id="outlined-basic 11"
              label="Hus nummer"
              variant="outlined"
              className={classes.third}
            />
          </div>
        </form>
      )}
    </>
  );
};

const confirmStyles = makeStyles({
  room: {
    height: '100px',
    width: '100%',
    padding: '5px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cancelButton: {
    backgroundColor: '#ee0000',
    '&:hover': {
      backgroundColor: '#cc0000'
    }
  },
  left: {
    flex: 'auto',
    marginRight: '40px'
  },
  dates: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  details: {
    marginTop: '5px'
  },
  customer: {
    margin: '20px'
  }
});
const Confirm = ({ booking, room, user }) => {
  const classes = confirmStyles();

  const getTotal = () =>
    Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(
      dayjs(booking.to_date).diff(booking.from_date, 'day') * room.price
    );

  return (
    <Container>
      <div className={classes.left}>
        <div className={classes.dates}>
          <Typography variant="h5" component="h2">
            Innsjekk: {booking.from_date}
          </Typography>
          <Typography variant="h5" component="h2">
            Utsjekk: {booking.to_date}
          </Typography>
        </div>
        <Divider />
        <Typography variant="p" component="p" className={classes.details}>
          Rom nummer: {room.room_number} - {room.title}
        </Typography>
        <Typography variant="p" component="p" className={classes.details}>
          Antall personer: {booking.people}
        </Typography>
        <Typography variant="p" component="p" className={classes.details}>
          Kommentar: {booking.comment}
        </Typography>
        <Divider />
        <Typography variant="h5" component="h5">
          Kundeinformasjon:
        </Typography>
        <div className={classes.customer}>
          <Typography variant="p" component="p" className={classes.details}>
            Epost: {user.email}
          </Typography>
          <Typography variant="p" component="p" className={classes.details}>
            Navn: {user.first_name} {user.last_name}
          </Typography>
        </div>
      </div>
      <Divider />
      <Typography variant="h6">{`Total: ${getTotal()} NOK`}</Typography>
    </Container>
  );
};

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: '1500px'
  },
  stages: {
    width: '50%',
    marginBottom: '50px'
  },
  flex: {
    margin: 'auto'
  },
  title: {
    color: '#444',
    padding: '10px 20px'
  },
  bookButton: {
    backgroundColor: '#3f51b5',
    color: 'white',
    '&:hover': {
      backgroundColor: '#445bd8;'
    }
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px'
  }
});

const BookRoom = ({ room }) => {
  const classes = useStyles();
  const router = useRouter();
  const [stage, setStage] = useState(1);

  const steps = [
    'Bekreft booking detaljer',
    'Bekreft bruker informasjon',
    'Book!'
  ];
  const { people, from_date, to_date, room_id } = router.query;

  const [booking, setBooking] = useState({
    people,
    from_date,
    to_date,
    room_id
  });
  const [user, setUser] = useState();

  const context = useContext(UserContext);

  if (context.user.loggedIn && stage == 2) {
    setStage(3);
  }

  const passInfo = async () => {
    const body = context.user.loggedIn
      ? {
          ...booking
        }
      : {
          ...booking,
          customer: user.customer
        };

    const bookingInfo = await postReq(
      body,
      'bookings/',
      context.user && context.user.accessToken
    );

    await context.setUser({
      ...context.user,
      bookedRoom: bookingInfo
    });

    router.push('/booking');
  };

  const handleBook = () => {
    passInfo();
  };

  return (
    <Paper className={classes.root}>
      <Divider />
      <Stepper activeStep={stage - 1}>
        {steps.map((label, index) => {
          return (
            <Step key={label} completed={index < stage}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Container className={classes.stages}>
        <Paper>
          <div className={classes.flex}>
            {stage == 1 && (
              <ConfirmBooking
                setStage={setStage}
                room={room}
                setBooking={setBooking}
                booking={booking}
              />
            )}
            {stage == 2 && (
              <GetUserInfo setStage={setStage} setUser={setUser} />
            )}
            {stage == 3 && (
              <Container>
                <Confirm
                  booking={booking}
                  room={room}
                  user={(user && user.customer) || context.user.customer}
                />
              </Container>
            )}
          </div>
          <Container className={classes.buttons}>
            <Button
              size="large"
              variant="contained"
              className={classes.bookButton}
              disabled={stage == 1}
              onClick={() =>
                setStage(context.user.loggedIn ? stage - 2 : stage - 1)
              }
            >
              Tilbake
            </Button>

            <Button
              size="large"
              variant="contained"
              className={classes.bookButton}
              onClick={stage == 3 ? handleBook : () => setStage(stage + 1)}
            >
              {stage == 3 ? 'Bekreft booking' : 'Neste'}
            </Button>
          </Container>
        </Paper>
      </Container>
    </Paper>
  );
};

export default BookRoom;
