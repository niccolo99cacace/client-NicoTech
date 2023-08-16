import React, { useContext,useState, useEffect } from 'react';
import {getItems,deleteItemById} from "../api/items";
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
import AdminOrNotContext from '../contexts/AdminOrNotContext';
import {getAdminOrNot} from "../api/auth";
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from "@material-ui/core/IconButton";
import {Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',  // Aggiungi questa linea per rendere la larghezza delle card dinamica
    marginBottom: '15px'  // Aggiungi un po' di margine tra le card per una migliore visualizzazione
  },
  pos: {
    marginBottom: 12,
  },

}));


function CardList() {

  //per l'avviso quando l'admin vuole eliminare un item
  const [open, setOpen] = useState(false);

  const handleAlertOpen = async () => {
    setOpen(true);
  };

  const handleCancelClick = () => {
    setOpen(false);
  };

  const handleConfirmClick = async (itemId) => {
    const res = await deleteItemById({itemId:itemId});
    // Effettua il ricaricamento della home
    window.location.replace("/");
  };




  const { homeItems, updateHomeItems } = useContext(HomeItemsContext);
  const {adminOrNot, updateAdminOrNot} = useContext(AdminOrNotContext);

  const classes = useStyles();


  useEffect(() => {

    const itemsFetch = async () => {
      
    const res = await getItems();
    updateHomeItems(() => {
      return [...res];
    });   };

    itemsFetch();
  }, []);


  const navigate = useNavigate();

  const handleViewProduct = (itemId) =>  { navigate("/item/"+ itemId); }

  const handlePageAddProduct = () =>  { navigate("/admin/AddItem"); }

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

  {adminOrNot &&
  <Button style={{marginBottom:"20px", backgroundColor:"green",color:"white"}} 
  onClick={handlePageAddProduct} >Add product</Button>
  }


    <Grid container spacing={3}>
      {homeItems.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
          <Card className={classes.root}>
      <CardContent>
      {adminOrNot &&
        <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton color="inherit" onClick={handleAlertOpen} >
      <ClearIcon style={{color:"red"}}></ClearIcon>
      </IconButton>
      
      <Dialog open={open} >
        <DialogTitle>Notice</DialogTitle>
        <DialogContent>
          <p>The product {item.name} ({item.brand}) will be deleted</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleConfirmClick(item._id)} color="primary" autoFocus>
            CONFIRM
          </Button>
          <Button onClick={handleCancelClick} color="primary" autoFocus>
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
      </Box>
      }




            <Typography variant="h5" component="h2">
              {item.name}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {item.category} - {item.brand}
            </Typography>
          
          
            <Image className={classes.image} src={item.imageUrl[0]}  disableSpinner={false}  />
          
         
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