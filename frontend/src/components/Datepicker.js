import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {}
});

export default function MaterialUIPickers() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around" className={classes.root}>
        <KeyboardDatePicker
          disableToolbar
          // variant="inline"
          format="dd/MM/yyyy"
          // margin="normal"
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
}
