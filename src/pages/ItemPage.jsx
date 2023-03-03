import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Accordion, AccordionSummary, AccordionDetails} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ImageCarousel from "../components/ImageCarousel";
import {getItemById} from "../api/items";
import Container from '@material-ui/core/Container';
import {addItemToCart, addItemSessionCart} from '../api/cart';
import { CartCountContext } from '../contexts/CartCountContext';
import  AuthenticationContext from '../contexts/AuthenticationContext';
import Review from "../components/Review";

const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
    marginTop:'25px',
  },
  imageSlider: {
    width: '100%',
  },
  productDetails: {
    textAlign: 'left',
  },

  counter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 'auto',
    marginLeft:'20px',
  },
  count: {
    width: '100px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${theme.palette.primary.main}`,
    margin: theme.spacing(1),
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    borderRadius: '5px'
  },
  counterButton: {
    minWidth: '30px',
    height: '30px',
    margin: theme.spacing(1),
    fontWeight: 'bold',
    color: "#0046be",
    borderRadius: '5px'
  },
}));

export default function ProductComponent() {
  const classes = useStyles();
  const [item,setItem] = React.useState({name: "",
  brand: "",
  description: "",
  largeDescription: "",
  category: "",
  price: 0,
  availability: 1,
imageUrl:["gg"]});

const { cartCount, addToCart } = useContext(CartCountContext);

const { authentication } = useContext(AuthenticationContext);

//per caricare le informazioni dello specifico item 
  useEffect(() => {

    const itemResearch = async () => {
    const path = window.location.pathname;
    const pathArray = path.split("/");
    const lastPath = pathArray[pathArray.length - 1];
    console.log(lastPath);
    const res = await getItemById({_id:lastPath}); 
    console.log(res);
    setItem(res);   };

    itemResearch();
  }, []);


  const [count, setCount] = useState(1);

  const handleIncrement = (max) => {
    if (count < max) {
      setCount(count + 1);
    }
    };
    
    const handleDecrement = () => {
    if (count > 1) {
    setCount(count - 1);
    }
    };



    const handleAddCart = async (itemId,itemQuantity) => {
      var double;

      if(authentication == true){
        double = await addItemToCart({"itemId":itemId, "itemQuantity":itemQuantity});
      }
      else{
        double = await addItemSessionCart({"itemId":itemId, "itemQuantity":itemQuantity});
      }
       
      if(double.double==false)       addToCart();

      };

  return (
    <Container>
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={6}>
            <ImageCarousel images={item.imageUrl} />
        </Grid>
        <Grid item xs={12} sm={6}>
          
            <div className={classes.productDetails}>
              <Typography variant="h4">{item.name} </Typography>
              <Typography variant="h6">{item.brand}</Typography>
              
              <Typography variant="h6">Price : {item.price} $</Typography>
<Typography variant="subtitle1">Availability : {item.availability}</Typography>


<div className={classes.counter}>
    <Button className={classes.Counterbutton} onClick={handleDecrement}>-</Button>
    <Typography className={classes.count} variant='h5'>{count}</Typography>
    <Button className={classes.button} onClick={() => handleIncrement(item.availability)}>+</Button>
    </div>

<Button className={classes.addCartButton} 
style={{    backgroundColor: '#ff9800',
    color: 'white',
    marginTop:'15px',
    marginBottom:'15px',
    marginLeft:'20px'}} onClick={() => handleAddCart(item._id,count)}>Add to Cart</Button>

<Typography variant="body1" style={{marginTop:"7px"}}>{item.description}</Typography>
</div>
</Grid>
</Grid>

<Typography variant="h6" style={{marginTop:"30px"}}>Description:</Typography>

<Typography variant="body1" style={{whiteSpace: 'pre-wrap'}}>{item.largeDescription}</Typography>

<Typography variant="h6" style={{marginTop:"30px"}}>Reviews:</Typography>

<Typography variant="h6" style={{marginTop:"30px"}}>Similar products:</Typography>

<Review
  username="Mario Rossi"
  date="20/02/2023"
  rating={4}
  description="Prodotto di ottima qualità!nggnfgffggz
  nfnfnfgngnngngd
  dgnndgzdgnzzzzzzzzzzzzzzzzzzzzz zzzzzzzzzzzzzzzzzzzzzzzz fijnf bnof fnus fsisv diondsdsvno vsndnksvn visd 
   zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
  ndgzzzzzzzz"
  imageUrl="https://picsum.photos/200/200"
/>


</div>
</Container>
);
}