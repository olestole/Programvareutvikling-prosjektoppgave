import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  orange: props => ({
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    width: theme.spacing(props.size),
    height: theme.spacing(props.size)
  }),
  purple: props => ({
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    width: theme.spacing(parseInt(props.size)),
    height: theme.spacing(parseInt(props.size))
  })
}));

export default function LetterAvatars(props) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Avatar className={classes[props.color]}>{props.letter}</Avatar>
    </div>
  );
}
