import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardMedia,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  FormControl,
  FormGroup,
  FormLabel,
  FormControlLabel,
  Checkbox,
  Typography,
  CircularProgress
} from '@material-ui/core';

import useSWR from 'swr';
import { getReq } from '../utils/api';

// Styles for Room. This should be placed in media query
// Not optimal for phone view at all
const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: '100%',
    maxWidth: '100%',
    marginBottom: '40px'
  },
  media: {
    height: 'auto' /* Imageheight has to specified for image to show */,
    flex: '1'
  },
  flexList: {
    flex: '1.5',
    width: '100%'
  }
});

const Room = props => {
  const classes = useStyles();

  const { title, room_number, price, capacity } = props.room;
  const { handleClick } = props;
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image="/Hotelroom.jpg"
        title="Contemplative Reptile"
      />{' '}
      <List className={classes.flexList} aria-label="Room attributes">
        <ListItem>
          <ListItemText variant="h5" primary={title} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary={`${capacity} sengeplasser`} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary={price} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary={room_number} />
        </ListItem>
        <Divider />
        <ListItem>
          <Button size="small" color="primary" onClick={handleClick}>
            Se mer
          </Button>
        </ListItem>
      </List>
    </Card>
  );
};

const filterClasses = makeStyles({
  root: {
    padding: '10px',
    position: 'sticky',
    top: '100px'
  },
  amenityForm: {
    margin: '10px'
  },
  amenities: {
    padding: '10px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr'
  }
});

const Filters = ({ setFilters, filters }) => {
  const classes = filterClasses();
  const { data, error } = useSWR('rooms/amenities/', url => getReq(url));

  let amenities = null;
  if (data && !error) {
    amenities = data;
  }

  const handleAmenityChange = event => {
    setFilters({
      ...filters,
      amenities: filters.amenities.filter(a => a != event.target.name)
    });
    event.target.checked &&
      setFilters({
        ...filters,
        amenities: [...filters.amenities, event.target.name]
      });
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h4">Filtre</Typography>
      <Divider />
      <FormControl className={classes.amenityForm}>
        <FormLabel component="ledgend">Fasiliteter</FormLabel>
        <FormGroup>
          <Card className={classes.amenities}>
            {amenities &&
              amenities.map(a => (
                <FormControlLabel
                  key={a.key}
                  control={
                    <Checkbox name={a.key} onChange={handleAmenityChange} />
                  }
                  label={a.value}
                />
              ))}
          </Card>
        </FormGroup>
      </FormControl>
    </Paper>
  );
};

// Styles for the Roomlist container
const listStyles = makeStyles({
  root: {
    marginTop: '100px',
    display: 'flex',
    width: '90%',
    justifyContent: 'space-between'
  },
  left: {
    flexBasis: '65%'
  },
  right: {
    flexBasis: '25%'
  }
});

const getFilterString = filters => {
  const amenities = filters.amenities && filters.amenities.join(',');
  const params = {
    amenities: amenities,
    ...filters
  };
  return Object.keys(params)
    .filter(Boolean)
    .map(key => key + '=' + params[key])
    .join('&');
};

const Roomlist = props => {
  const classes = listStyles();
  const router = useRouter();

  const [filters, setFilters] = useState({
    from_date: router.query.from_date,
    to_date: router.query.to_date,
    people: router.query.people,
    amenities: []
  });

  const filterString = getFilterString(filters);

  const { data, isValidating } = useSWR(
    `rooms/?${filterString}`,
    url => getReq(url),
    {
      initialData: props.room
    }
  );

  const rooms = data;

  const handleClick = id => {
    const { from_date, to_date } = router.query;
    router.push(
      `/rooms/[id]/?from_date=${from_date}&to_date=${to_date}`,
      `/rooms/${id}/?from_date=${from_date}&to_date=${to_date}`
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.left}>
        {isValidating ? (
          <CircularProgress />
        ) : (
          rooms &&
          rooms.map(room => (
            <Room
              key={room.id}
              room={room}
              handleClick={() => handleClick(room.id)}
            />
          ))
        )}
      </div>
      <div className={classes.right}>
        <Filters setFilters={setFilters} filters={filters} />
      </div>
    </div>
  );
};

export default Roomlist;
