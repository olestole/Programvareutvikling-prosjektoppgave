import React from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    maxWidth: '100%',
    marginTop: '2em'
  },
  media: {
    height: 150
  },
  flexImageItem: {
    flex: '1'
  },
  flexTextItem: {
    flex: '3'
  }
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.flexImageItem}>
        <CardMedia
          className={classes.media}
          image="/building.jpg"
          title="Contemplative Reptile"
        />
      </CardActionArea>
      <CardActionArea className={classes.flexTextItem}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <Button size="small" color="primary">
          <Link href="booking">
            <a>Book rom</a>
          </Link>
        </Button>
      </CardActionArea>
    </Card>
  );
}
