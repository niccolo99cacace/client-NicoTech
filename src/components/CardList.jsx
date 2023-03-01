import React, { useContext,useState, useEffect } from 'react';
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
import LateralMenu from './LateralMenu';
import Divider from '@mui/material/Divider';
import { useNavigate } from "react-router-dom";
import {HomeItemsContext} from '../contexts/HomeItemsContext';


const useStyles = makeStyles({
  root: {
    minWidth: 220,

  },
  pos: {
    marginBottom: 12,
  },


});


function CardList() {

  const { homeItems, updateHomeItems } = useContext(HomeItemsContext);
  

  const classes = useStyles();


  useEffect(() => {

    const itemsFetch = async () => {
    const res = await getItems();
    console.log(res);
    updateHomeItems(() => {
      return [...res];
    });   };

    itemsFetch();
  }, []);



  const navigate = useNavigate();

  const handleViewProduct = (itemId) =>  { navigate("/item/"+ itemId); }

  return (
    <React.Fragment>

    <Grid container spacing={2} style={{ marginTop: '10px' }}>
  <Grid item xs={12} sm={3} md={3} lg={3}>
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <LateralMenu />
    <Divider orientation="vertical" flexItem style={{marginRight:40}}/>
    </div>
  </Grid>
  <Grid item xs={12} sm={9} md={9} lg={9}>
    <Grid container spacing={2}>
      {homeItems.map((item) => (
        <Grid item xs={12} sm={6} md={3} lg={3} key={item._id}>
          <Card className={classes.root}>
      <CardContent>
        
            <Typography variant="h5" component="h2">
              {item.name}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {item.category} - {item.brand}
            </Typography>
          
          
            <Image className={classes.image} src={item.imageUrl[0]}  disableSpinner={true}  />
          
         
          <Box>
            <Typography variant="h6" component="h2">
              Price: {item.price}€
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
            Availability: {item.availability}
            </Typography>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button className={classes.customButton} onClick={() => handleViewProduct(item._id)} size="small" sx={{ mr: "4" }} style={{ backgroundColor:"#0046be",color:"white"}}>
            view product
        </Button>
        </Box>
          
      
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