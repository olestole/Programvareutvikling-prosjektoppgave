import React, { useContext } from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  List,
  ListItem,
  Card,
  Typography,
  Tooltip
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Delete } from '@material-ui/icons';
import useSWR from 'swr';
import { UserContext } from '../UserProvider';
import { getReq, deleteReq } from '../../utils/api';
import dayjs from 'dayjs';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '100%',
    marginTop: '2em'
  },
  emptyCard: {
    height: '90%',
    padding: '20px'
  },
  link: {
    display: 'contents'
  }
});

const listStyles = makeStyles({
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
  }
});

const BookingList = ({ bookings, accessToken }) => {
  const classes = listStyles();
  const cancelBooking = async id => {
    await deleteReq(`bookings/${id}/`, accessToken);
  };

  const canCancelBooking = booking =>
    dayjs(booking.from_date).isAfter(dayjs().add(1, 'day'));

  return (
    <List>
      {bookings.map(booking => (
        <ListItem key={booking.id}>
          <Card className={classes.room}>
            <div className={classes.left}>
              <div className={classes.dates}>
                <Typography variant="h5" component="h2">
                  Innsjekk: {booking.from_date}{' '}
                </Typography>
                <Typography variant="h5" component="h2">
                  Utsjekk: {booking.to_date}
                </Typography>
              </div>
              <Divider />
              <Typography variant="p" component="p" className={classes.details}>
                Rom nummer: {booking.room}
              </Typography>
              <Typography variant="p" component="p" className={classes.details}>
                Antall: {booking.people}
              </Typography>
            </div>
            <div className={classes.right}>
              <Tooltip
                title={
                  canCancelBooking(booking)
                    ? 'Kanseller booking'
                    : 'Du kan kun kansellere innen 24 timer før innsjekk'
                }
              >
                <span>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Delete />}
                    className={classes.cancelButton}
                    disabled={!canCancelBooking(booking)}
                    onClick={() => cancelBooking(booking.id)}
                  >
                    Kanseller
                  </Button>
                </span>
              </Tooltip>
            </div>
          </Card>
        </ListItem>
      ))}
    </List>
  );
};

const BookingDetail = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);

  const { data, error } = useSWR(
    user.accessToken ? ['bookings/', user.accessToken] : null,
    url => getReq(url, user.accessToken),
    { suspense: true }
  );
  const bookings = data;
  return (
    <Container className={classes.root}>
      <h1>Dine bookinger</h1>
      {error ? (
        <Alert severity="error">Noe gikk fryktelig galt :(</Alert>
      ) : bookings && bookings.length > 0 ? (
        <>
          <Divider />
          <BookingList bookings={bookings} accessToken={user.accessToken} />
        </>
      ) : (
        <Alert severity="info">
          Du har ikke booket noen rom enda, søk i{' '}
          <Link href="/">
            <a className={classes.link}>romlisten</a>
          </Link>{' '}
          for å booke ditt første rom!
        </Alert>
      )}
    </Container>
  );
};

export default BookingDetail;
