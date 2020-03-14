import React, { useContext, Suspense } from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Card,
  CardHeader
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { getBookings } from '../../utils/api';
import useSWR from 'swr';
import config from '../../../config/env';

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

const BookingList = ({ bookings }) => {
  return (
    <List>
      {bookings.map(booking => (
        <ListItem key={booking.id}>
          <Card>
            <CardHeader>
              {booking.from_date} - {booking.to_date}
            </CardHeader>
            <span>Rom: {booking.room}</span>
            <Button>Kanseller booking</Button>
          </Card>
        </ListItem>
      ))}
    </List>
  );
};

const BookingDetail = props => {
  const classes = useStyles();
  const { bookings } = props;

  const { data, error } = useSWR(`${config.serverUrl}/bookings`);
  return (
    <Container className={classes.root}>
      <h1>Dine bookinger</h1>
      {bookings ? (
        <BookingList bookings={bookings} />
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
