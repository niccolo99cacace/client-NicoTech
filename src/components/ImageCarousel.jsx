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
  imageContainer: {
    height: '300px',
    width: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    objectFit: 'contain',
    height: '100%',
    width: '100%',
  },
  counter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
});

const ImageCarousel = (props) => {


  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(currentIndex === props.images.length - 1 ? 0 : currentIndex + 1);
  };

  const handlePrev = () => {
    setCurrentIndex(currentIndex === 0 ? props.images.length  - 1 : currentIndex - 1);
  };

  return (
    <div>
    <div className={classes.root}>
      <IconButton onClick={handlePrev}>
        <ChevronLeftIcon />
      </IconButton>
      <div className={classes.imageContainer}>
      <img src={props.images[currentIndex]} className={classes.image} alt="slider-image" />
      </div>
      <IconButton onClick={handleNext}>
        <ChevronRightIcon />
      </IconButton>
      
    </div>
    <div className={classes.counter}>
        {currentIndex + 1}/{props.images.length}
      </div>
      
      </div>
  );
};

export default ImageCarousel;