import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Avatar, Grid, Box } from '@material-ui/core';
import Rating from '@mui/material/Rating';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Review = ({ username, date, rating, description, imageUrl }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      
        <Grid container >
        <Grid item xs={12} sm={2} md={1}>
            <Avatar alt={username} src={imageUrl} className={classes.avatar} />
          </Grid>
          <Grid item xs={12} sm={7} md={8}>
            <Typography variant="subtitle2" color="textSecondary">{username}-{date}</Typography>
            <Typography variant="body1" style={{whiteSpace: 'pre-wrap'}} >{description}</Typography>
          </Grid>
          <Grid item xs={12} sm={3} md={3} container justifyContent="flex-end">
            <Rating name="rating" value={rating} readOnly />
          </Grid>
        </Grid>
      
    </Box>
  );
};

export default Review;