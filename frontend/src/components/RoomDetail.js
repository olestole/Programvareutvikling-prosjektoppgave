import React, { useContext, useState } from 'react';
import router, { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Container,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Chip
} from '@material-ui/core';
import {
  Close,
  Hotel,
  Bathtub,
  Pets,
  Kitchen,
  Tv,
  Wifi,
  Accessible,
  Lock
} from '@material-ui/icons';
import cx from 'classnames';
import { DateRange } from 'react-date-range';

import dayjs from 'dayjs';

import { UserContext } from '../components/UserProvider';
import { postReq } from '../utils/api';
import RequireLogin from '../utils/requireLogin';

const gridStyles = makeStyles({
  gridImage: {
    maxWidth: '100%',
    display: 'block',
    height: 'auto',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.1)'
    },
    transition: 'transform .5s ease-out'
  },
  imgContainer: {
    overflow: 'hidden'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  col1: {
    flex: '2 1 67%',
    minWidth: '400px'
  },
  col2: {
    flex: '2 1 33%',
    flexDirection: 'column'
  },
  subrow: {
    height: '50%',
    '& img': {
      height: '100%'
    }
  },
  modalList: {
    display: 'flex',
    flexDirection: 'column'
  },
  modalImage: {
    maxWidth: '100%',
    height: 'auto'
  },
  modalTitle: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  modalClose: {
    position: 'absolute',
    right: '5px',
    top: '5px'
  }
});

// TODO: actual images
const ImageGrid = ({ count }) => {
  const classes = gridStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const images = [
    '/Hotelroom.jpg',
    '/NewYork.jpg',
    '/NewYork2.jpg',
    '/Hotelroom.jpg'
  ];
  const imagesToShow = images.length > count ? images.slice(0, count) : images;

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <Dialog
        maxWidth="md"
        fullWidth={true}
        scroll="body"
        open={modalOpen}
        onClose={closeModal}
      >
        <DialogTitle className={classes.modalTitle}>
          <Typography variant="h5">Bilder</Typography>
          <IconButton onClick={closeModal} className={classes.modalClose}>
            <Close />
          </IconButton>
          <Divider />
        </DialogTitle>
        <DialogContent>
          <div className={classes.modalList}>
            {images.map(image => (
              <div key={image}>
                <img
                  style={{ maxWidth: '100%' }}
                  className={classes.modalImage}
                  src={image}
                />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      <div className={classes.row}>
        <div
          className={cx(classes.col1, classes.imgContainer)}
          onClick={openModal}
        >
          <img src={imagesToShow[0]} className={classes.gridImage} />
        </div>
        <div className={classes.col2}>
          {imagesToShow.slice(1, 3).map(image => (
            <div
              className={cx(classes.subrow, classes.imgContainer)}
              key={image}
              onClick={openModal}
            >
              <img src={image} className={classes.gridImage} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const RoomDetails = ({ room }) => {
  return (
    <Paper style={{ margin: '10px' }}>
      <List>
        <ListItem>
          <ListItemIcon>
            <Hotel />
          </ListItemIcon>
          <ListItemText primary={`${room.capacity} senger`} />
        </ListItem>
      </List>
    </Paper>
  );
};

const facilityStyles = makeStyles({
  root: {
    width: '300px',
    margin: '10px',
    marginTop: '20px',
    padding: '0'
  },
  chips: {
    display: 'flex',
    justifyContent: 'start',
    flexWrap: 'wrap',
    margin: '10px 0'
  },
  chip: {
    margin: '5px'
  },
  fas: {
    marginLeft: '10px'
  }
});

const RoomFacilities = ({ room }) => {
  const classes = facilityStyles();
  const tests = {
    bathroom: true,
    wifi: true,
    kitchen: true,
    tv: true,
    elevator: true
  };

  const getIcon = facility => {
    switch (facility) {
      case 'bathroom':
        return <Bathtub />;
      case 'wifi':
        return <Wifi />;
      case 'kitchen':
      case 'fridge':
        return <Kitchen />;
      case 'tv':
        return <Tv />;
      case 'elevator':
        return <Accessible />;
      case 'safe':
        return <Lock />;
      case 'animals':
        return <Pets />;
      default:
        return;
    }
  };
  return (
    <Container className={classes.root}>
      <Typography className={classes.fas} variant="h5">
        Fasiliteter
      </Typography>
      <Divider />
      <div className={classes.chips}>
        {Object.keys(tests)
          .filter(k => tests[k])
          .map(k => (
            <Chip
              className={classes.chip}
              key={k}
              label={k}
              icon={getIcon(k)}
            />
          ))}
      </div>
    </Container>
  );
};

const RoomDescription = ({ room }) => (
  <Paper style={{ margin: '10px', padding: '5px 20px' }}>
    <Typography variant="h5">Om dette rommet</Typography>
    <Divider />
    <Typography>{room.description}</Typography>
  </Paper>
);

const getAllDates = (startDate, endDate) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  let current = start;

  const dates = [current.toDate()];

  while (current.isBefore(end)) {
    current = current.add(1, 'day');
    dates.push(current.toDate());
  }
  return dates;
};

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
  bookButton: {
    backgroundColor: '#3f51b5',
    color: 'white',
    '&:hover': {
      backgroundColor: '#445bd8;'
    }
  }
});

const BookRoom = ({ room, fromDate, toDate, setIsBooking }) => {
  const classes = bookingStyles();

  const { unavailable_dates } = room;

  const [range, setRange] = useState({
    startDate: fromDate ? dayjs(fromDate).toDate() : dayjs().toDate(),
    endDate: toDate ? dayjs(toDate).toDate() : dayjs().toDate(),
    key: 'dates'
  });

  const disabledDates = unavailable_dates.flatMap(range =>
    getAllDates(range.from, range.start)
  );

  const handleChange = ranges => {
    const selection = ranges.dates;
    selection &&
      setRange({
        startDate: selection.startDate,
        endDate: selection.endDate,
        key: 'dates'
      });
  };

  const getTotal = () =>
    Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(
      dayjs(range.endDate).diff(range.startDate, 'day') * room.price
    );

  const context = useContext(UserContext);

  const passInfo = async () => {
    // TODO booking page
    const body = {
      from_date: dayjs(range.startDate).format('YYYY-MM-DD'),
      to_date: dayjs(range.endDatae).format('YYYY-MM-DD'),
      people: 2, //TODO
      room_id: room.id,
      customer: context.user.customer
    };

    const bookingInfo = await postReq(
      body,
      'bookings/',
      context.user.accessToken
    );

    await context.setUser({
      ...context.user,
      bookedRoom: bookingInfo
    });

    router.push('/booking');
  };

  const handleBooking = () => {
    setIsBooking(true);
    context.user.loggedIn && passInfo();
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h5"> Book dette rommet</Typography>
      <Divider />
      <Container className={classes.dateWrapper}>
        <DateRange
          months={2}
          showMonthAndYearPickers={false}
          direction="horizontal"
          showDateDisplay={false}
          ranges={[range]}
          disabledDates={disabledDates}
          onChange={handleChange}
        />
      </Container>
      <Divider />
      <Container className={classes.book}>
        <Typography variant="h6">{`Total: ${getTotal()} NOK`}</Typography>
        <Button
          size="large"
          variant="contained"
          className={classes.bookButton}
          onClick={handleBooking}
        >
          Book
        </Button>
      </Container>
      <Divider />
    </Paper>
  );
};

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: '1500px'
  },
  flexList: {
    flex: '2.5',
    width: '100%'
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: '10px'
  },
  left: {
    flex: 'auto'
  },
  right: {
    flex: '60%'
  },
  title: {
    color: '#444',
    padding: '10px 20px'
  }
});

const RoomDetail = ({ room }) => {
  const classes = useStyles();
  const router = useRouter();

  const context = useContext(UserContext);
  const [isBooking, setIsBooking] = useState(false);

  if (isBooking && !context.user.loggedIn) {
    return (
      <RequireLogin>
        <span>If you see this, something went wrong</span>
      </RequireLogin>
    );
  }

  return (
    <Paper className={classes.root}>
      <ImageGrid images={room.images} count={3} />
      <Typography className={classes.title} variant="h3">
        {room.title}
      </Typography>
      <Divider />
      <div className={classes.flex}>
        <div className={classes.left}>
          <RoomDetails room={room} />
          <RoomFacilities room={room} />
        </div>
        <div className={classes.right}>
          <RoomDescription room={room} />
        </div>
      </div>
      <BookRoom
        room={room}
        fromDate={router.query.from_date}
        toDate={router.query.to_date}
        setIsBooking={setIsBooking}
      />
    </Paper>
  );
};

export default RoomDetail;
