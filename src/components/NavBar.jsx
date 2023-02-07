import React  from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
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
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function NavBar() {



  const classes = useStyles();

  
  const navigate = useNavigate();
  const onLogin = () =>  { navigate("/login"); }

  const onCart = () =>  { navigate("/Cart"); }

  

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Nico Style
          </Typography>
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
          <IconButton color="inherit" onClick={onLogin}>
            <AccountCircle />
          </IconButton>
          <IconButton color="inherit" onClick={onCart} >
  <ShoppingCartIcon />
</IconButton>
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