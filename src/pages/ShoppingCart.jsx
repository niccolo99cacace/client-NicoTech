import React, { useState , useEffect} from 'react';
import Typography from "@material-ui/core/Typography";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Button,
  makeStyles,
  useTheme
} from '@material-ui/core';
import {Paper , Container, Box } from '@mui/material';
import { Add, Remove } from '@material-ui/icons';
import "./ShoppingCart.css";
import { getCartItemsByUser,deleteItemFromCart } from '../api/cart';



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
    },
    total: {
    fontWeight: 700,
  },


  },
}));


  function ShoppingCart() {


  const classes = useStyles();
  const theme = useTheme();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  
  const cartItemsFetch = async () => {

    const res = await getCartItemsByUser();
      setCartItems(() => {
        return [...res];
      });  
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
  const handleDelete =  (itemId) => {
    deleteItemFromCart({"itemId":itemId});
    cartItemsFetch(); }

  
  const handleQuantityChange = (itemId, type) => {
  const updatedItems = cartItems.map(item => {
  if (item.id === itemId) {
  if (type === 'increment' && item.quantity < 10) {
  item.quantity += 1
  } else if (type === 'decrement' && item.quantity > 1) {
  item.quantity -= 1;
  }
  }
  return item;
  });
  setCartItems(updatedItems);
  };
  
  return (

<Container>

  
  <List>
  {cartItems.map((item) => (
    <Paper elevation={3} sx={{height:"100%", weight:"100%", mt:"10px",mx:"10px"}}>
  <ListItem key={item._id}>
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
primary=<h3>{item.itemId.price}$</h3>
secondary=<p>Num:{item.itemQuantity}</p>
/>
</Grid>

<Grid item xs={10} sm={7} md={3} className={classes.counterAndButton}>

<Button onClick={() => handleQuantityChange(item.id, 'decrement')}>
<Remove />
</Button>
<Button onClick={() => handleQuantityChange(item.id, 'increment')}>
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

<Box style={{ display: 'flex', alignItems: 'center',  justifyContent: 'flex-end' }}>
<Button
     variant="contained"
     style={{ backgroundColor:"#0046be", color:"white", mr:10 }}
     className={classes.button}
   >
GO TO PAYMENT
</Button>
 <Typography className={classes.total} variant="h5" style={{ display: 'flex', justifyContent: 'flex-end' }}>
       Total price: {total} $ 
      </Typography>
      </Box>
</Container>
)
}


export default ShoppingCart;



