import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl,Container } from '@material-ui/core';

const AddItem = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [productType, setProductType] = useState('');
  const [availability, setAvailability] = useState(0);
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };

  const handleProductTypeChange = (event) => {
    setProductType(event.target.value);
  };

  const handleAvailabilityChange = (event) => {
    setAvailability(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleImage1Change = (event) => {
    setImages(event.target.files);
  };

  const handleShortDescriptionChange = (event) => {
    setShortDescription(event.target.value);
  };

  const handleLongDescriptionChange = (event) => {
    setLongDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // qui puoi fare l'invio del form tramite una chiamata HTTP
  };

  return (
    <Container>
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={name}
        onChange={handleNameChange}
        required
        margin="normal"
        style={{marginLeft:"40px"}}
      />
      <TextField
        label="Brand"
        value={brand}
        onChange={handleBrandChange}
        required
        margin="normal"
        style={{marginLeft:"40px"}}
      />
      <FormControl required  margin="normal" style={{marginLeft:"40px", width:"200px"}}>
        <InputLabel id="product-type-label">Typology</InputLabel>
        <Select
          labelId="product-type-label"
          value={productType}
          onChange={handleProductTypeChange}
        >
          <MenuItem value="type1">Tipo 1</MenuItem>
          <MenuItem value="type2">Tipo 2</MenuItem>
          <MenuItem value="type3">Tipo 3</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Disponibilità"
        type="number"
        value={availability}
        onChange={handleAvailabilityChange}
        required
        style={{marginLeft:"40px"}}
        margin="normal"
      />
      <TextField
        label="Prezzo"
        type="number"
        value={price}
        onChange={handlePriceChange}
        required
        style={{marginLeft:"40px"}}
        margin="normal"
      />
      <TextField
        label="Image1"
        type="file"
        onChange={handleImage1Change}
        required
        style={{marginLeft:"40px"}}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          accept: 'image/*',
        }}
      />
      <TextField
        label="Image2"
        type="file"
        onChange={handleImage1Change}
        required
        style={{marginLeft:"40px"}}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          accept: 'image/*',
        }}
      />
      <TextField
        label="Image3"
        type="file"
        onChange={handleImage1Change}
        required
        style={{marginLeft:"40px"}}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          accept: 'image/*',
        }}
      />
      <TextField
        label="Descrizione breve"
        value={shortDescription}
        onChange={handleShortDescriptionChange}
        required
        fullWidth
        margin="normal"
        multiline
        rows={3}
      />
      <TextField
        label="Descrizione lunga"
        value={longDescription}
        onChange={handleLongDescriptionChange}
required
fullWidth
margin="normal"
multiline
rows={7}
/>
<Button type="submit" variant="contained" color="primary" style={{marginTop:"40px"}}>
Inserisci prodotto
</Button>
</form>
</Container>
);
};

export default AddItem;