import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  image: {
    height: '80%',
    width: 'auto',
  },
  counter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
});

const ImageCarousel = () => {


    const image1 = '../Images/autunno.jpg';
const image2 = '../Images/estate.jpg'; 
const image3 = '../Images/inverno.jpg';
const images = [image1, image2, image3];
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const handlePrev = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  return (
    <div>
    <div className={classes.root}>
      <IconButton onClick={handlePrev}>
        <ChevronLeftIcon />
      </IconButton>
      <img src={images[currentIndex]} className={classes.image} alt="slider-image" />
      <IconButton onClick={handleNext}>
        <ChevronRightIcon />
      </IconButton>
      
    </div>
    <div className={classes.counter}>
        {currentIndex + 1}/{images.length}
      </div>
      </div>
  );
};

export default ImageCarousel;