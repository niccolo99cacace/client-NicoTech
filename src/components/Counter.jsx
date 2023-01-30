import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 'auto',
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
  button: {
    minWidth: '30px',
    height: '30px',
    margin: theme.spacing(1),
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    borderRadius: '5px'
  },
}));

export default function Counter({ startingValue = 0, max = 10, min = 0 }) {
  const classes = useStyles();
  const [count, setCount] = useState(startingValue);

  const handleIncrement = () => {
    if (count < max) {
      setCount(count + 1);
    }
    };
    
    const handleDecrement = () => {
    if (count > min) {
    setCount(count - 1);
    }
    };
    
    return (
    <div className={classes.root}>
    <Button className={classes.button} onClick={handleDecrement}>-</Button>
    <Typography className={classes.count} variant='h5'>{count}</Typography>
    <Button className={classes.button} onClick={handleIncrement}>+</Button>
    </div>
    );
    }