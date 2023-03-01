import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import { Box } from '@mui/material';
import {HomeItemsContext} from '../contexts/HomeItemsContext';
import {getFilteredItems} from "../api/items";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  divider: {
    marginBottom: 40,
  },
}));

export default function LateralMenu() {

  const { homeItems, updateHomeItems } = useContext(HomeItemsContext);

  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [minPrice, setMinPrice] = useState(undefined);
  const [maxPrice, setMaxPrice] = useState(undefined);

  const handleCategoryChange = (event) => {
    setCategories(event.target.value);
  };

  const handleBrandChange = (event) => {
    setBrands(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };


  const handleFilters = async (event) => {
    //chiamando "event.preventDefault()" viene annullata l'azione predefinita del form 
    //di ricerca (che sarebbe di inviare una richiesta HTTP) ,quindi invece viene inviata 
    //una richiesta AJAX al backend API utilizzando la libreria "axios".
    event.preventDefault();
    try{
      const completeQuery = {categories:categories, brands:brands, minPrice:minPrice, maxPrice:maxPrice};
      console.log(completeQuery);
      const results = await getFilteredItems(completeQuery);
      console.log(results);
      updateHomeItems(() => {
        return [...results];
      });
    } catch (err) {
        console.log(err);
    }
  };

  
  return (
    <React.Fragment>
    <Box
        
        sx={{ 
         display: "inline-flex",
         flexDirection: "column",
  
       }}
             >
      <List>
        <ListItem>
          <FormControl className={classes.formControl}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              multiple
              value={categories}
              onChange={handleCategoryChange}
              renderValue={(selected) => selected.join(", ")}
            >
              <MenuItem value="Portable PC">
                <Checkbox checked={categories.indexOf("Portable PC") > -1} />
                <ListItemText primary="Portable PC" />
              </MenuItem>

              <MenuItem value="Smartphone">
                <Checkbox checked={categories.indexOf("Smartphone") > -1} />
                <ListItemText primary="Smartphone" />
              </MenuItem>

              <MenuItem value="Monitor">
                <Checkbox checked={categories.indexOf("Monitor") > -1} />
                <ListItemText primary="Monitor" />
              </MenuItem>
              
            </Select>
          </FormControl>
        </ListItem>




        <ListItem>
          <FormControl className={classes.formControl}>
            <InputLabel id="brand-select-label">Brand</InputLabel>
            <Select
              labelId="brand-select-label"
              id="brand-select"
              multiple
              value={brands}
              onChange={handleBrandChange}
              renderValue={(selected) => selected.join(", ")}
            >
              <MenuItem value="MSI">
                <Checkbox checked={brands.indexOf("MSI") > -1} />
                <ListItemText primary="MSI" />
              </MenuItem>

              <MenuItem value="HP">
                <Checkbox checked={brands.indexOf("HP") > -1} />
                <ListItemText primary="HP" />
              </MenuItem>

              <MenuItem value="Xiaomi">
                <Checkbox checked={brands.indexOf("Xiaomi") > -1} />
                <ListItemText primary="Xiaomi" />
              </MenuItem>

              <MenuItem value="Acer">
                <Checkbox checked={brands.indexOf("Acer") > -1} />
                <ListItemText primary="Acer" />
              </MenuItem>

              <MenuItem value="LG">
                <Checkbox checked={brands.indexOf("LG") > -1} />
                <ListItemText primary="LG" />
              </MenuItem>

              <MenuItem value="Samsung">
                <Checkbox checked={brands.indexOf("Samsung") > -1} />
                <ListItemText primary="Samsung" />
              </MenuItem>
            
            </Select>
          </FormControl>
        </ListItem>



        
        <ListItem>
          <TextField
            label="Min Price"
            type="number"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="Max Price"
            type="number"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </ListItem>
      </List>

      <Button type="submit"  variant="contained" size="small" onClick={handleFilters}
      style={{  backgroundColor:"white", color:"#0046be",marginTop: '25px',marginLeft:'35px'}}
  >Apply filters</Button>
  </Box>
    </React.Fragment>
  );
}
