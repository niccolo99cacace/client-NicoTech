import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Box, TextField} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ImageCarousel from "../components/ImageCarousel";
import {getItemById,getReviewsByItem,updateItemPrice,updateItemAvailability} from "../api/items";
import Container from '@material-ui/core/Container';
import {addItemToCart, addItemSessionCart} from '../api/cart';
import { CartCountContext } from '../contexts/CartCountContext';
import  AuthenticationContext from '../contexts/AuthenticationContext';
import Review from "../components/Review";
import AdminOrNotContext from '../contexts/AdminOrNotContext';

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

export default function ItemPage() {

  const classes = useStyles();
  const [item,setItem] = useState({
  _id:undefined,  
  name: "",
  brand: "",
  description: "",
  largeDescription: "",
  category: "",
  price: 0,
  availability: 1,
imageUrl:["gg"]});

const [reviews, setReviews] = useState([]);

const { cartCount, addToCart } = useContext(CartCountContext);

const { authentication } = useContext(AuthenticationContext);




const {adminOrNot, updateAdminOrNot} = useContext(AdminOrNotContext);
//il nuovo prezzo e disponibilità inseriti dall'admin
const [newPrice, setNewPrice] = useState("");
const [newAvailability, setNewAvailability] = useState("");

//questo 2 change sono per gestire i TextField
const handleNewPriceChange = (event) => {
  setNewPrice(event.target.value);
};

const handleNewAvailabilityChange = (event) => {
  setNewAvailability(event.target.value);
};

//questi due metodi sono per inviare la richiesta di modifica rispettivamente i prezzo e disponibilità
const handleNewPriceUpdate = async () => {
  const res = await updateItemPrice({newPrice:newPrice,itemId:item._id});

};

const handleNewAvailabilityUpdate = async () => {
  const res = await updateItemAvailability({newAvailability:newAvailability,itemId:item._id});
};



//per caricare le informazioni dello specifico item 
  useEffect(() => {

    const path = window.location.pathname;
    const pathArray = path.split("/");
    const lastPath = pathArray[pathArray.length - 1];


    const itemResearch = async () => {
    const res = await getItemById({_id:lastPath}); 
    setItem(res);   };


    const reviewsResearch = async () => {
      const res = await getReviewsByItem({itemId:lastPath}); 
      setReviews(res);   };

    itemResearch();
    reviewsResearch();
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


<Grid   container
        spacing={2}
        style={{ marginTop: 30, alignItems: "center" }}>
        <Grid item xs={12} sm={4} md={4}>
          <TextField
            label="new price"
            onChange={handleNewPriceChange}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#0046be", color: "white" }}
            onClick={handleNewPriceUpdate}
          >
            modify price
          </Button>
        </Grid>
      </Grid>

      <Grid   container
        spacing={2}
        style={{ marginTop: 30,marginBottom:"20px", alignItems: "center" }}>
        <Grid item xs={12} sm={4} md={4}>
          <TextField
            label="new availability"
            onChange={handleNewAvailabilityChange}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#0046be", color: "white" }}
            onClick={handleNewAvailabilityUpdate}
          >
            modify availability
          </Button>
        </Grid>
      </Grid>




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

<Typography variant="body1" style={{whiteSpace: 'pre-wrap',marginTop:"30px"}} >{item.largeDescription}</Typography>

<Typography variant="h6" style={{marginTop:"30px",marginBottom:"30px"}}>Reviews:</Typography>

{reviews.map((review) => (

<Review 
  username={review.reviewId.username}
  date={review.reviewId.date.substring(0, 10)}
  rating={review.reviewId.rating}
  description={review.reviewId.description}
  imageUrl={review.reviewId.username.charAt(0)}
/>
))}


{authentication &&
  <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
 <Button style={{ backgroundColor:"#0046be",color:"white", marginTop:"50px"}}>ADD REVIEW</Button>
 </Box>
}

<Typography variant="h6" style={{marginTop:"30px"}}>Similar products:</Typography>
</div>
</Container>
);
}