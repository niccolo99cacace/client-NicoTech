import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import StarIcon from '@material-ui/icons/Star';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ImageSlider from "../components/ImageSlider";
import Counter from "../components/Counter";
import {getItemById} from "../api/items";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  imageSlider: {
    width: '100%',
  },
  productDetails: {
    textAlign: 'left',
  },
  favoriteButton: {
    color: '#ff9800',
  },
  addToCartButton: {
    backgroundColor: '#ff9800',
    color: 'white',
    '&:hover': {
      backgroundColor: '#ffc107',
    },
  },
}));

export default function ProductComponent() {
  const classes = useStyles();
  const [item,setItem] = React.useState({name: "",
  brand: "",
  description: "an amazing white sweatshirt",
  category: "sweatshirt",
  price: 200,
  availability: 8});
  const [favorited, setFavorited] = React.useState(false);
  const [expanded, setExpanded] = React.useState('reviews');

  const toggleFavorite = () => {
    setFavorited(!favorited);
  };

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



  return (
    <div className={classes.root}>
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={12} sm={6}>
            <ImageSlider/>
        </Grid>
        <Grid item xs={12} sm={6}>
          
            <div className={classes.productDetails}>
              <Typography variant="h5">{item.name} </Typography>
              <Typography variant="subtitle1">{item.brand}</Typography>
              <Typography variant="body1">Description : {item.description}</Typography>
              <Typography variant="subtitle1">Price : {item.price} $</Typography>
<Typography variant="subtitle1">Availability : {item.availability}</Typography>
<IconButton onClick={{toggleFavorite}}>
{favorited ? <FavoriteIcon className={classes.favoriteButton} /> : <StarIcon />}
</IconButton>
<Button className={classes.addToCartButton}>Add to Cart</Button>
<Counter/>
</div>




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
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
probare, quae sunt a te dicta? Refert tamen, quo modo.
</Typography>
</ExpansionPanelDetails>
</ExpansionPanel>
</Grid>
</Grid>
</Paper>
</div>
);
}