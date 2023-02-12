import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  divider:{
    marginBottom: 40
  }
}));

export default function LateralMenu() {
  const classes = useStyles();
  const [categories, setCategories] = React.useState([]);
  const [brands, setBrands] = React.useState([]);
  const [minPrice, setMinPrice] = React.useState('');
  const [maxPrice, setMaxPrice] = React.useState('');

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

  return (
    <React.Fragment>
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
              renderValue={(selected) => selected.join(', ')}
            >
              <MenuItem value="category1">
                <Checkbox checked={categories.indexOf('category1') > -1} />
                <ListItemText primary="Category 1" />
              </MenuItem>
              <MenuItem value="category2">
                <Checkbox checked={categories.indexOf('category2') > -1} />
                <ListItemText primary="Category 2" />
              </MenuItem>
              {/* Aggiungi altre categorie */}
            </Select>
          </FormControl>
        </ListItem>
        <ListItem>
          <FormControl className={classes.formControl}>
            <InputLabel id="brand-select-label">Brand</InputLabel>
            <Select labelId="brand-select-label"
id="brand-select"
multiple
value={brands}
onChange={handleBrandChange}
renderValue={(selected) => selected.join(', ')}
>
<MenuItem value="brand1">
<Checkbox checked={brands.indexOf('brand1') > -1} />
<ListItemText primary="Brand 1" />
</MenuItem>
<MenuItem value="brand2">
<Checkbox checked={brands.indexOf('brand2') > -1} />
<ListItemText primary="Brand 2" />
</MenuItem>
{/* Aggiungi altre brand */}
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

</React.Fragment>

);
}