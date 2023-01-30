import React, { useState } from 'react';
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Button,
  ListItemSecondaryAction,
  makeStyles,
  useMediaQuery,
  useTheme
} from '@material-ui/core';
import {Paper , Container, Box } from '@mui/material';
import { Add, Remove } from '@material-ui/icons';
import Image from 'material-ui-image';
import "./ShoppingCart.css";


const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
  },
  gridContainer: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  gridItem: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '50%',
    },
  },
}));

const defaultItems = [
  {
    id: 1,
    name: 'Item 1',
    brand: 'Brand 1',
    price: 10.99,
    quantity: 1,
    image: 'https://res.cloudinary.com/deze9bms8/image/upload/v1673906443/samples/ecommerce/shoes.png'
  },
  {
    id: 2,
    name: 'Item 2',
    brand: 'Brand 2',
    price: 20.99,
    quantity: 2,
    image: 'https://via.placeholder.com/150x150'
  },
  {
  id: 3,
  name: 'Item 3',
  brand: 'Brand 3',
  price: 30.99,
  quantity: 1,
  image: 'https://via.placeholder.com/150x150'
  },
  ];
  
  function ShoppingCart({ items = defaultItems, onDelete, onCheckout }) {

  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [cartItems, setCartItems] = useState(items);
  
  const handleDelete = (itemId) => {
  setCartItems(cartItems.filter(item => item.id !== itemId));
  onDelete(itemId);
  }
  
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
  <ListItem key={item.id}>
  <Grid container className={classes.gridContainer}>
  <Grid item xs={6} sm={7} md={3} className={classes.gridItem}>
  <img src={item.image}  className="item-image" alt={item.name}/>
</Grid>
<Grid item xs={6} sm={5} md={9} className={classes.gridItem}>
<Box sx={{display:"flex"}}>
<ListItemText
primary={item.name}
secondary={item.brand}
/>
<ListItemText
primary=<p>Price: {item.price}$</p>
secondary=<p>Quantity: {item.quantity}</p>
/>
</Box>

<ListItemSecondaryAction>
<Box sx={{display:"flex", flexDirection:"column"}}>
<Button onClick={() => handleQuantityChange(item.id, 'decrement')}>
<Remove />
</Button>
<Button onClick={() => handleQuantityChange(item.id, 'increment')}>
<Add />
</Button>
<Button onClick={() => handleDelete(item.id)}>
Delete
</Button>
</Box>
</ListItemSecondaryAction>

</Grid>
</Grid>
</ListItem>
</Paper>
))}


</List>

<Button
     variant="contained"
     color="primary"
     className={classes.button}
     onClick={onCheckout}
   >
GO TO PAYMENT
</Button>
</Container>
)
}


export default ShoppingCart;



