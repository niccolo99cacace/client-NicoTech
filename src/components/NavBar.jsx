import React, { useContext,useEffect, useState } from "react";
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
import Button from "@mui/material/Button";
import {getSearchResults,getSuggestions} from "../api/items";
import {HomeItemsContext} from '../contexts/HomeItemsContext';


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
    border: '2px solid white',


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

  const { homeItems, updateHomeItems } = useContext(HomeItemsContext);

  const [query, setQuery] = useState('');

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



//gestione Search 
  const handleSearch = async (event) => {
    //chiamando "event.preventDefault()" viene annullata l'azione predefinita del form 
    //di ricerca (che sarebbe di inviare una richiesta HTTP) ,quindi invece viene inviata 
    //una richiesta AJAX al backend API utilizzando la libreria "axios".
    event.preventDefault();
    try{
      const completeQuery = {query:query};
      const results = await getSearchResults(completeQuery);
      updateHomeItems(() => {
        return [...results];
      });
    } catch (err) {
        console.log(err);
    }
  };


  //aggiornamento asincrono degli item della home in base alla stringa contenuta nella barra di ricerca
  const handleInputChange = async (event) => {
// aggiornamento asincrono del campo di ricerca
setQuery(event.target.value);
try{
  //dato che il setQuery non è immediato mi prendo direttamente dalla barra di ricerca il contenuto 
  //da cercare per la ricerca asincrona , cosi lo metto in un oggetto con proprietà query
const completeQuery = {query:event.target.value};
const results = await getSuggestions(completeQuery);
updateHomeItems(() => {
return [...results];
});
} catch (error) {
console.log(error);
}
};
 

  return (
    <div className={classes.root}>
    
      <AppBar position="static" style={{ backgroundColor:"#0046be" }}>     
        <Toolbar>
        <Link to="/">
      <img src="https://res.cloudinary.com/deze9bms8/image/upload/v1675944061/NicoTechBlu_nlgepy.png" alt="Logo" className={classes.logo} />
    </Link>
          <div className={classes.search}>
            
            <IconButton color="inherit" onClick={handleSearch} >
            <div className={classes.searchIcon}>
              <SearchIcon />
              </div>
              </IconButton>
            
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={handleInputChange}
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
