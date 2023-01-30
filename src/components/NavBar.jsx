import { AppBar, Toolbar, Typography, IconButton, InputBase, Grid } from "@material-ui/core";
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