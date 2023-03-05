import React, { useState , useEffect, useContext} from 'react';
import Typography from "@material-ui/core/Typography";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Button,
  makeStyles,
  useTheme,Dialog, DialogTitle, DialogContent, DialogActions
} from '@material-ui/core';
import {Paper , Container, Box } from '@mui/material';
import { Add, Remove } from '@material-ui/icons';
import "./ShoppingCart.css";
import { getCartItemsByUser,deleteItemFromCart,getCartItemsBySessionCart,removeItemBySessionCart,clearCart } from '../api/cart';
import { CartCountContext } from '../contexts/CartCountContext';
import AuthenticationContext from '../contexts/AuthenticationContext';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
    marginRight:"20px",
  },
 
  image: {
    objectFit: 'contain',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  counterAndButton: {
    [theme.breakpoints.up('sm')]: {
      marginTop: 40,
    },
    [theme.breakpoints.up('xs')]: {
      marginTop: 10,
    },},
    total: {
    fontWeight: 700,
    marginTop: 10,
  },


  
}));


  function ShoppingCart() {

    const [open, setOpen] = useState(false);

  const handleAlertOpen = async () => {
    await clearCart();
    setOpen(true);

  };

    const handleContinueClick = () => {
    // Effettua il reindirizzamento a un'altra pagina
    window.location.replace("/");
  };

  const { cartCount, decToCart } = useContext(CartCountContext);
  const { authentication } = useContext(AuthenticationContext);

  const classes = useStyles();
  const theme = useTheme();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  
  const cartItemsFetch = async () => {

    var res = [];

    if(authentication == true){
      res = await getCartItemsByUser();
    }
    else{
      res = await getCartItemsBySessionCart();
    }

      if(res.length > -1){
      setCartItems(() => {
        return [...res];
      });  
    }
    }

   useEffect(() => {
    cartItemsFetch();
  }, []);  
  

//calcolo totale prezzo ad ogni rendering 
  useEffect(() => {

    const totalCalc = () => {
      

    var x = 0;
    cartItems.map((item) => {
    x = x + (item.itemId.price * item.itemQuantity);
    });
    setTotal(x);
    }; 

    totalCalc();

  }, [cartItems]);    


  //delete item
  const handleDelete =  async (itemId) => {

    if(authentication == true){
       await deleteItemFromCart({"itemId":itemId});
    }
    else{
      await removeItemBySessionCart({"itemId":itemId});
    }

    decToCart();
    cartItemsFetch(); }



/*
  
  const handleQuantityChange = async (itemId, type) => {

    var res;

  const updatedItems = cartItems.map(item => {
  if (item.itemId._id === itemId) {
  if (type === 'increment') {
    if(authentication == true){
      res = await incrementItemQuantity(itemId);
    }}
    if (type === 'decrement') {
      if(authentication == false){
        res = await incrementItemQuantitySessionCart(itemId);
      }}
    }
  });
  console.log(res); 
  
  };       
  
  da mettere come metodo dei bottoni
  ************onClick={() => handleQuantityChange(item.itemId._id, 'increment')}
  */
  
  return (

<Container>

  
  <List>
  {cartItems.map((item) => (
    <Paper key={item.itemId._id} elevation={3} sx={{height:"100%", weight:"100%", mt:"10px",mx:"10px"}}>
  <ListItem>
  <Grid container className={classes.gridContainer}>
  <Grid item xs={12} sm={6} md={3} className={classes.image}>
  <img src={item.itemId.imageUrl[0]}  className="item-image" alt={item.name}/>
</Grid>

<Grid item xs={12} sm={6} md={5} className={classes.gridItem}>
<ListItemText
primary={item.itemId.name}
secondary={item.itemId.description}
/>
</Grid>
<Grid item xs={2} sm={5} md={1} className={classes.gridItem}>
<ListItemText style={{ ml:"4px" }}
primary={<span><h3>{item.itemId.price}$</h3></span>}
secondary={<span>Num:{item.itemQuantity}</span>}
/>
</Grid>

<Grid item xs={10} sm={7} md={3} className={classes.counterAndButton}>

<Button >
<Remove />
</Button>
<Button >
<Add />
</Button>
<Button onClick={() => handleDelete(item.itemId._id)} variant="outlined" style={{ color:"#ff1744" }}>
Delete
</Button>


</Grid>


</Grid>
</ListItem>
</Paper>
))}


</List>

<Box style={{ display: 'flex', alignItems: 'center',  justifyContent: 'flex-end', mr:4 }}>
{authentication ? (
<Button
     variant="contained"
     style={{ backgroundColor:"#0046be", color:"white", mr:10 }}
     className={classes.button}
     onClick={handleAlertOpen}
   >
GO TO PAYMENT
</Button>
) : (
  <Typography variant="h6" style={{ color:"red" }}>
   If you want to buy, you need to login or eventually to create an account first </Typography>
)}
 <Typography className={classes.total} variant="h5" style={{ display: 'flex', justifyContent: 'flex-end' }}>
       Total price: {total} $ 
      </Typography>

       <Dialog open={open} >
        <DialogTitle>Notice</DialogTitle>
        <DialogContent>
          <p>Your purchase has been successful.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleContinueClick} color="primary" autoFocus>
            CONTINUE
          </Button>
        </DialogActions>
      </Dialog>
      </Box>
</Container>
)
}


export default ShoppingCart;



