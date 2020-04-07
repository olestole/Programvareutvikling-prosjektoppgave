import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '10em',
    margin: '3px'
  }
});

const DatePicker = props => {
  // Day: Sunday-indexed -->
  // Months: 0-indexed --> January.getMonth() == 0.
  // Year: 1900-indexed --> 2020.getYear() == 120
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = date => {
    setSelectedDate(date);
    props.dateChange(date);
  };

  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around" className={classes.root}>
        <KeyboardDatePicker
          disableToolbar
          format="dd/MM/yyyy"
          id="date-picker-inline"
          label="Ønsket dato"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
