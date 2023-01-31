import { signInUser } from "../api/auth";
import Button from "@mui/material/Button";
import React, { useState} from "react";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import {Paper , Box } from '@mui/material';
import { Link } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';


function Login() {




  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);



  const handleSubmit  = async event => {
    //event.preventDefault(); serve per evitare che la pagina venga ricaricata quando si invia il form
    event.preventDefault();

    const res = await signInUser(formData);
  
if(res.hasOwnProperty("user") == true ){ console.log("ok");navigate("/", {
  //replace:true non permette all'utente di tornare indietro(col tasto del browser) al login una volta acceduto
  replace: true,
});;}
if(res.hasOwnProperty("error") == true ) {setError(res.error); console.log("nooooooooooooo");} 
  
  };

  //event permette di accedere ai campi del form
  const handleChange = event => {
    setFormData({
      ...formData,
      //quel .name sta per il campo name che sta tra i <TextField> 
      //viene creato un campo con quel nome nell'oggetto se non c'è , se c'è già viene aggiornato 
      //con il valore presente nel form 
      [event.target.name]: event.target.value
    });
  };


  return (
    <React.Fragment>



    <Box
        
     sx={{ 
      display: "inline-flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    height: "100vh",
    width:"100%",

    }}
          >


<form onSubmit={handleSubmit}>
      <FormControl>

      <Paper sx={{
  p: 2,
  gap: 3,
  justifyContent: "center",
          alignItems: "center",
          display: "inline-flex",
          flexDirection: "column", }}
          >
<Typography variant="caption" >
j.parker@meddoctor.org
      </Typography>
<TextField
name="email"
          label="email"
          variant="filled"
          onChange={handleChange}
        />

<Typography variant="caption"> 
DocJParker
      </Typography>
<TextField
name="password"
          label="password"
          type="password"
          autoComplete="current-password"
          variant="filled"
          onChange={handleChange}
        />
 {error && <FormHelperText error>{error}</FormHelperText>}
<Button type="submit"  variant="contained" sx={{mr:"4"}} style={{ backgroundColor: "black" }}>Login</Button> 
</Paper>
</FormControl>
    </form>

<Link to="/registration" style={{marginTop: '20px'}} >I’m not registered yet</Link>
</Box>

</React.Fragment>
  );
}


export default Login;
