import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl,Container } from '@material-ui/core';
import {uploadImage1OnCloud,uploadImage2OnCloud,uploadImage3OnCloud} from "../../api/items";

const ImagesOnCloud = () => {

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

  const handleImage = async () => {
    
    const formData1 = new FormData();
    const formData2 = new FormData();
    const formData3 = new FormData();
    formData1.append('image1', image1);
    formData2.append('image2', image2);
    formData3.append('image3', image3);
    await uploadImage1OnCloud(formData1);
    await uploadImage2OnCloud(formData2);
    await uploadImage3OnCloud(formData3);
  } 



  return (
    <Container>

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

<Button type="submit" variant="contained" color="primary" onClick={handleImage} style={{marginTop:"40px"}}>
Inserisci prodotto
</Button>

</Container>
);
};

export default ImagesOnCloud;