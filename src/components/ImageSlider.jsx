import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Box } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection:"column",
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
    width: '100%',
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
    width: '100%',
    overflow: 'hidden',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    padding: theme.spacing(1),
  },
  counter: {
    marginRight: theme.spacing(2),
  },
}));

const image1 = '../Images/autunno.jpg';
const image2 = '../Images/estate.jpg'; 
const image3 = '../Images/inverno.jpg';
const images = [image1, image2, image3];

export default function ImageSlider() {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleBack = () => {
    if (currentIndex === 0) {
      setCurrentIndex(images.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex === images.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.imageContainer}>
        <img src={images[currentIndex]} alt="slider" className={classes.image} />
      </div>
      <div className={classes.footer}>
        <IconButton onClick={handleBack}>
          <ArrowBackIosIcon />
        </IconButton>
        <span className={classes.counter}>
          {currentIndex + 1}/{images.length}
        </span>
        <IconButton onClick={handleNext}>
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
    </div>
  
  );
}








/*

import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const image1 = '../Images/autunno.jpg';
const image2 = '../Images/estate.jpg'; 
const image3 = '../Images/inverno.jpg';
const images = [image1, image2, image3];

function ImageSlider() {
  const [currentImage, setCurrentImage] = useState(0);

  const handlePrevious = () => {
    if (currentImage === 0) {
      setCurrentImage(images.length - 1);
    } else {
      setCurrentImage(currentImage - 1);
    }
  };

  const handleNext = () => {
    if (currentImage === images.length - 1) {
      setCurrentImage(0);
    } else {
      setCurrentImage(currentImage + 1);
    }
  };

  return (
    <div>
      <IconButton onClick={handlePrevious} style={{ marginBottom: '20px' }}>
        <ChevronLeft />
      </IconButton>
      <img src={images[currentImage]} alt={`Slide ${currentImage + 1}`}/>
      <IconButton onClick={handleNext}>
        <ChevronRight />
      </IconButton>
    </div>
  );
}

export default ImageSlider;                     */