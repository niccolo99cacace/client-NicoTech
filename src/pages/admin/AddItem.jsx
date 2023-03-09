import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl,Container } from '@material-ui/core';
import {uploadImage1OnCloud,uploadImage2OnCloud,uploadImage3OnCloud,createItem} from "../../api/items";


const AddItem = () => {
  
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);


  const handleImage1Change = (event) => {
    setImage1(event.target.files[0]);
  };

  const handleImage2Change = (event) => {
    setImage2(event.target.files[0]);
  };

  const handleImage3Change = (event) => {
    setImage3(event.target.files[0]);
  };



  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [productType, setProductType] = useState('');
  const [availability, setAvailability] = useState(0);
  const [price, setPrice] = useState(0);
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

  const handleShortDescriptionChange = (event) => {
    setShortDescription(event.target.value);
  };

  const handleLongDescriptionChange = (event) => {
    setLongDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //prima carico le immagini su cloud
    const formData1 = new FormData();
    const formData2 = new FormData();
    const formData3 = new FormData();
    formData1.append('image1', image1);
    formData2.append('image2', image2);
    formData3.append('image3', image3);
    const url1 = await uploadImage1OnCloud(formData1);
    const url2 = await uploadImage2OnCloud(formData2);
    const url3 = await uploadImage3OnCloud(formData3);
  
    await createItem({name:name, brand:brand, category:productType, price:price, description:shortDescription,
      availability:availability, imageUrl:[url1,url2,url3], largeDescription:longDescription})
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
          <MenuItem value="Portable PC">Portable PC</MenuItem>
          <MenuItem value="Smartphone">Smartphone</MenuItem>
          <MenuItem value="Monitor">Monitor</MenuItem>
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
        onChange={handleImage2Change}
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
        onChange={handleImage3Change}
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