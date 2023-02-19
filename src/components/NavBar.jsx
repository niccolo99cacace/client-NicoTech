import React, { useContext,useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import {CartCountContext} from '../contexts/CartCountContext';
import { styled } from '@mui/material/styles';
import {authenticatedOrNot} from "../api/auth";
import LoginIcon from '@mui/icons-material/Login';
import AuthenticationContext from '../contexts/AuthenticationContext';
import {getCartItemsNumberByUserId,getSessionCartItemsNumber} from "../api/cart";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: 50,
    },

  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "white",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    color: "white",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },

  logo: {
    borderRadius: '25%',
    flexGrow: 1,
    display: "none",
    height: '50px',
    [theme.breakpoints.up("sm")]: {
      display: "block",
      height: '70px'},
    }
}
));






export default function NavBar() {


  const classes = useStyles();

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: 0,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
      backgroundColor:"#ff9800",
    },
  }));
  
  const navigate = useNavigate();
  const onLogin = () =>  { navigate("/login"); }

  const onProfile = () =>  { navigate("/userProfile"); }

  const onCart = () =>  { navigate("/Cart"); }

  const { cartCount, updateCartCount } = useContext(CartCountContext);

  const { authentication, updateAuthentication } = useContext(AuthenticationContext);


  //per gestire l'AuthenticationContext che determina se l'utente è loggato o no oppure se è dotato di token valido
  useEffect(() => {


    const authenticationControl = async () => {
    const res = await authenticatedOrNot();
    //se l'utente è autenticato
    if(res==0) {
      updateAuthentication(true);
      const count = await getCartItemsNumberByUserId();
      updateCartCount(count);
    }
    //se invece l'utente non è autenticato
    else{
      const count = await getSessionCartItemsNumber();
      updateCartCount(count);
      
  }
}

    authenticationControl();
  }, []);

  return (
    <div className={classes.root}>
    
      <AppBar position="static" style={{ backgroundColor:"#0046be" }}>     
        <Toolbar>
        <Link to="/">
      <img src="https://res.cloudinary.com/deze9bms8/image/upload/v1675944061/NicoTechBlu_nlgepy.png" alt="Logo" className={classes.logo} />
    </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
          {authentication ? (
          <IconButton color="inherit" onClick={onProfile}>
            <AccountCircle />
          </IconButton>
          ) : (
          <IconButton color="inherit" onClick={onLogin}>
            <LoginIcon />
          </IconButton>
          )}

          <StyledBadge badgeContent={cartCount} >
          <IconButton color="inherit" onClick={onCart} >
  <ShoppingCartIcon />
</IconButton>
</StyledBadge>

        </Toolbar>
      </AppBar>
    </div>
  );
}





/*  import { AppBar, Toolbar, Typography, IconButton, InputBase, Grid } from "@material-ui/core";
import { Search,  ShoppingCart} from "@mui/icons-material";
import LoginIcon from '@mui/icons-material/Login';
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {

  const navigate = useNavigate();


  const onLogin = () =>  { navigate("/login"); }

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Grid item xs={4}>
          <InputBase className={"small-input"} placeholder="Search" />
          </Grid>
          <Grid item xs={1}>
            <IconButton>
              <Search />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" noWrap>
              NicoStyle
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <IconButton  onClick={onLogin}>
              <LoginIcon/>
            </IconButton>
            <IconButton>
              <ShoppingCart />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

*/