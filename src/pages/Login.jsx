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
import { sendResetPasswordMailAndToken } from '../api/auth';


function Login() {




  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [errorSendEmailResetPassword, setErrorSendEmailResetPassword] = useState(null);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetPasswordTextField, setResetPasswordTextField] = useState("");



  const viewSendEmailTextField = () =>  {setForgotPassword(true);
 }

  const handleSubmit  = async event => {
    //event.preventDefault(); serve per evitare che la pagina venga ricaricata quando si invia il form
    event.preventDefault();

    const res = await signInUser(formData);
  
if(res.hasOwnProperty("user") == true )
//rendirizzo l'utente alla home e la pagina (compresa NavBar) si ricarica
window.location.replace("/");
if(res.hasOwnProperty("error") == true ) 
setError(res.error);
  
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

  //per aggiornare il TextField dell'email per il reset della password 
  const handleChangeResetPassword = event => {
    setResetPasswordTextField(event.target.value);
  };


  //per mandare l'email di reset password
  const handleResetPassword =  async (email) => {

    const res = await sendResetPasswordMailAndToken({"email":email});

    //message è il messaggio di errore inviato dal server 
    //ok nel caso il messaggio sia positivo
    if(res.hasOwnProperty("message") == true )
    setErrorSendEmailResetPassword(res.message);
    if(res.hasOwnProperty("ok") == true ) 
    setErrorSendEmailResetPassword(res.ok);
  }


  return (
    <React.Fragment>



    <Box
        
     sx={{ 
      display: "inline-flex",
      flexDirection: "column",
      
      alignItems: "center",
    height: "100vh",
    width:"100%",
marginTop:"40px",
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
Email: 
      </Typography>
<TextField
name="email"
          label="email"
          variant="filled"
          onChange={handleChange}
        />

<Typography variant="caption"> 
Password:
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
<Button type="submit"  variant="contained"  style={{ backgroundColor:"#0046be",color:"white"}}>Login</Button> 
</Paper>
</FormControl>
    </form>

<Link to="/registration" style={{marginTop: '20px'}} >I’m not registered yet</Link>

{!forgotPassword ? (
<Button type="submit"  variant="contained" style={{  backgroundColor:"white", color:"#0046be",marginTop: '25px'}} onClick={viewSendEmailTextField}>Forgot password</Button>
) : (
  <React.Fragment>
  <Button type="submit"  variant="contained" style={{  backgroundColor:"white", color:"#0046be",marginTop: '25px'}}
  onClick={() => handleResetPassword(resetPasswordTextField)}>Send Email</Button>
  <Typography variant="caption" style={{marginTop: '15px', marginLeft:'9px'}} >
We will send you a message to reset your password.
Please write youre email. 
      </Typography>
<TextField
          label="email"
          variant="filled"
          onChange={handleChangeResetPassword}
        />

 {errorSendEmailResetPassword && <FormHelperText error>{errorSendEmailResetPassword}</FormHelperText>}
        </React.Fragment>
  )}

</Box>

</React.Fragment>
  );
}


export default Login;
