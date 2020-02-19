import React from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

// Styles for Room. This should be placed in media query
// Not optimal for phone view at all
const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: '100%',
    maxWidth: '100%',
    marginTop: '2em'
  },
  media: {
    height: 'auto' /* Imageheight has to specified for image to show */,
    flex: '1'
  },
  flexList: {
    flex: '2.5',
    width: '100%'
  }
});

const MediaCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image="/building.jpg"
        title="Contemplative Reptile"
      />
      <List className={classes.flexList} aria-label="Room attributes">
        <ListItem>
          <ListItemText variant="h5" primary="Familierom" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="5 soveplasser" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Attributt 1" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Attributt 2" />
        </ListItem>
        <Divider />
        <ListItem>
          <Button size="small" color="primary">
            <Link href="booking">
              <a>Book rom</a>
            </Link>
          </Button>
        </ListItem>
      </List>
    </Card>
  );
};

export default MediaCard;
