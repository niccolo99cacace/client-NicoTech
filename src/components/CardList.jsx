import React, { useState, useEffect } from 'react';
import {getItems} from "../api/items";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'material-ui-image';
import "./CardList.css";




const useStyles = makeStyles({
  root: {
    minWidth: 220,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  customButton: {
    backgroundColor: '#FAE2C6',
    color: 'black'
  },
});


function CardList() {

  const classes = useStyles();

  const [itemss, setItems] = useState([]);

  useEffect(() => {

    const itemsFetch = async () => {
    const res = await getItems();
    setItems(() => {
      return [...res];
    });   };

    itemsFetch();
  }, []);



  return (
    <Grid container spacing={2} style={{ marginTop: '10px' }}>
      {itemss.map((item) => (
        <Grid item xs={12} sm={6} md={3} lg={3} key={item._id} >
        <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={2} >
          <Grid item xs={12}>
            <Typography variant="h5" component="h2">
              {item.name}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {item.category} - {item.brand}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Image className="fit-image" src={item.imageUrl}  disableSpinner={true}  />
          </Grid>
          <Grid item xs={12} container justifyContent="space-between">
          <Box>
            <Typography variant="h6" component="h2">
              Price: {item.price}€
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
            Availability: {item.availability}
            </Typography>
            </Box>
            <Button className={classes.customButton} size="small" href={item._id} >
            view product
        </Button>
          </Grid>  
        </Grid>
      </CardContent>
    </Card>
</Grid>
))}
</Grid>
);
}

export default CardList;