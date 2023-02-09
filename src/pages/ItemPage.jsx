import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ImageCarousel from "../components/ImageCarousel";
import {getItemById} from "../api/items";
import Container from '@material-ui/core/Container';
import {addItemToCart} from '../api/cart';

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
  panels: {
    marginTop:'25px',
  },
  addToCartButton: {
    backgroundColor: '#ff9800',
    color: 'white',
    '&:hover': {
      backgroundColor: '#ffc107',
    },
    marginTop:'15px',
    marginBottom:'15px',
    marginLeft:'20px',
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




  const [expanded, setExpanded] = React.useState('reviews');


  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
      addItemToCart({"itemId":itemId, "itemQuantity":itemQuantity});
      console.log({"itemId":itemId, "itemQuantity":itemQuantity});
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
              <Typography variant="h5">{item.name} </Typography>
              <Typography variant="subtitle1">{item.brand}</Typography>
              
              <Typography variant="subtitle1">Price : {item.price} $</Typography>
<Typography variant="subtitle1">Availability : {item.availability}</Typography>


<div className={classes.counter}>
    <Button className={classes.Counterbutton} onClick={handleDecrement}>-</Button>
    <Typography className={classes.count} variant='h5'>{count}</Typography>
    <Button className={classes.button} onClick={() => handleIncrement(item.availability)}>+</Button>
    </div>

<Button className={classes.addToCartButton} onClick={() => handleAddCart(item._id,count)}>Add to Cart</Button>

<Typography variant="body1">Description : {item.description}</Typography>
</div>


</Grid>
</Grid>


<div className={classes.panels}>
<ExpansionPanel expanded={expanded === 'reviews'} onChange={handleExpand('reviews')}>
<ExpansionPanelSummary
expandIcon={<ExpandMoreIcon />}
aria-controls="reviews-content"
id="reviews-header"
>
<Typography>Reviews</Typography>
</ExpansionPanelSummary>
<ExpansionPanelDetails>
<Typography>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
probare, quae sunt a te dicta? Refert tamen, quo modo.
</Typography>
</ExpansionPanelDetails>
</ExpansionPanel>
<ExpansionPanel expanded={expanded === 'similar'} onChange={handleExpand('similar')}>
<ExpansionPanelSummary
expandIcon={<ExpandMoreIcon />}
aria-controls="similar-content"
id="similar-header"
>
<Typography>Similar Products</Typography>
</ExpansionPanelSummary>
<ExpansionPanelDetails>
<Typography>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
probare, quae sunt a te dicta? Refert tamen, quo modo.
</Typography>
</ExpansionPanelDetails>
</ExpansionPanel>
<ExpansionPanel expanded={expanded === 'info'} onChange={handleExpand('info')}>
<ExpansionPanelSummary
expandIcon={<ExpandMoreIcon />}
aria-controls="info-content"
id="info-header"
>
<Typography>More Information</Typography>
</ExpansionPanelSummary>
<ExpansionPanelDetails>
<Typography>
{item.largeDescription}
</Typography>
</ExpansionPanelDetails>
</ExpansionPanel>
</div>
</div>
</Container>
);
}