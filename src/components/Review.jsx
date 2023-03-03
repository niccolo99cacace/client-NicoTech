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

  //gruppo di colori da cui sceglierne uno a caso
  const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', 
  '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722',
   '#795548', '#9e9e9e', '#607d8b'];
   // Genera un indice casuale nell'intervallo dei colori
  const colorIndex = Math.floor(Math.random() * colors.length);

  return (
    <Box className={classes.root} style={{marginTop:"20px"}} >
      
        <Grid container >
        <Grid item xs={12} sm={2} md={1}>
            <Avatar alt={username}  className={classes.avatar} style={{ backgroundColor: colors[colorIndex] }}>{imageUrl}</Avatar>
          </Grid>
          <Grid item xs={12} sm={7} md={8}>
            <Typography variant="subtitle2" color="textSecondary">{username} [{date}]</Typography>
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