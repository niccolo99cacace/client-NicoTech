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
import LateralMenu from './LateralMenu';




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
    backgroundColor: '#f5f5f5',
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
    <React.Fragment>
    <Grid container spacing={2} style={{ marginTop: '10px' }}>
  <Grid item xs={12} sm={3} md={3} lg={3}>
    <LateralMenu />
  </Grid>
  <Grid item xs={12} sm={9} md={9} lg={9}>
    <Grid container spacing={2}>
      {itemss.map((item) => (
        <Grid item xs={12} sm={6} md={3} lg={3} key={item._id}>
          <Card className={classes.root}>
      <CardContent>
        
            <Typography variant="h5" component="h2">
              {item.name}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {item.category} - {item.brand}
            </Typography>
          
          
            <Image className="fit-image" src={item.imageUrl[0]}  disableSpinner={true}  />
          
         
          <Box>
            <Typography variant="h6" component="h2">
              Price: {item.price}€
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
            Availability: {item.availability}
            </Typography>
            </Box>
            <Button className={classes.customButton} size="small" href={'/item/' + item._id} >
            view product
        </Button>
          
      
      </CardContent>
    </Card>
</Grid>
))}
</Grid>
</Grid>
</Grid>
</React.Fragment>
);
}

export default CardList;