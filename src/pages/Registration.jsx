import { createUser } from "../api/auth";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Paper, Box } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { Link } from 'react-router-dom';

function Registration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    //event.preventDefault(); serve per evitare che la pagina venga ricaricata quando si invia il form
    event.preventDefault();

    const res = await createUser(formData);
    console.log(res);
    if (res.hasOwnProperty("user") == true) {
      console.log("ok");
      navigate("/", {
        //replace:true non permette all'utente di tornare indietro(col tasto del browser) al login una volta acceduto
        replace: true,
      });
    }
    if (res.hasOwnProperty("error") == true) console.log("nooooooooooooo");
  };

  //event permette di accedere ai campi del form
  const handleChange = (event) => {
    setFormData({
      ...formData,
      //quel .name sta per il campo name che sta tra i <TextField>
      //viene creato un campo con quel nome nell'oggetto se non c'è , se c'è già viene aggiornato
      //con il valore presente nel form
      [event.target.name]: event.target.value,
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
          width: "100%",
        }}
      >
        <form onSubmit={handleSubmit}>
          <FormControl>
            <Paper
              sx={{
                p: 2,
                gap: 3,
                justifyContent: "center",
                alignItems: "center",
                display: "inline-flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="caption">Username :</Typography>
              <TextField
                name="name"
                label="username"
                variant="filled"
                onChange={handleChange}
              />

              <Typography variant="caption">Email :</Typography>
              <TextField
                name="email"
                label="email"
                variant="filled"
                onChange={handleChange}
              />

              <Typography variant="caption">Password :</Typography>
              <TextField
                name="password"
                label="password"
                type="password"
                autoComplete="current-password"
                variant="filled"
                onChange={handleChange}
              />

              <Button
                type="submit"
                variant="contained"
                sx={{ mr: "4" }}
                style={{ backgroundColor:"#0046be",color:"white"}}
              >
                Sign up
              </Button>
            </Paper>
          </FormControl>
        </form>
        <Link to="/login" style={{marginTop: '20px'}} >I already have an account</Link>
      </Box>
    </React.Fragment>
  );
}

export default Registration;
