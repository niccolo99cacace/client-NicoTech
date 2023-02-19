import { ConfirmResetPassword } from "../api/auth";
import Button from "@mui/material/Button";
import React, { useState, useEffect} from "react";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import {Paper , Box } from '@mui/material';
import { Link } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { useParams } from 'react-router-dom';

function ResetPassword() {

  const { token } = useParams();


  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState({newPassword: ""});
  const [confirmNewPassword, setConfirmNewPassword] = useState({confirmNewPassword: null});
  const [error, setError] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);


  //inviamo la nuova password
  const handleSubmit  = async event => {
    //event.preventDefault(); serve per evitare che la pagina venga ricaricata quando si invia il form
    event.preventDefault();

    const res = await ConfirmResetPassword({token:token, newPassword});

if(res.hasOwnProperty("error") == true ) 
setError(res.error);
  
  };


  //event permette di accedere ai campi del form
  const handleChangeNewPassword = event => {
    setNewPassword({
      ...newPassword,
      [event.target.name]: event.target.value
    });
  };

  const handleChangeConfirmNewPassword = event => {
    setConfirmNewPassword({
      ...confirmNewPassword,
      [event.target.name]: event.target.value
    });
  };


  //controlliamo se le due password sono uguali , se lo sono abilitiamo il bottone
  useEffect(() => {

    const confirmAndPasswordEqual =  () => {


    if(newPassword.newPassword == confirmNewPassword.confirmNewPassword) {
      setError("");
      setIsButtonDisabled(false);
    }
    
    else{
      setError("The two passwords are different");
      setIsButtonDisabled(true);
  }
}

    confirmAndPasswordEqual();
  }, [confirmNewPassword]);





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
New password:
      </Typography>
<TextField
name="newPassword"
          label="new password"
          type="password"
          variant="filled"
          onChange={handleChangeNewPassword}
        />

<Typography variant="caption"> 
Repeat new password:
      </Typography>
<TextField
name="confirmNewPassword"
          label="confirm new password"
          type="password"
          variant="filled"
          onChange={handleChangeConfirmNewPassword}
        />
 {error && <FormHelperText error>{error}</FormHelperText>}
<Button type="submit" disabled={isButtonDisabled} variant="contained" sx={{mr:"4"}} style={{ backgroundColor: "white" }}>confirm new password</Button> 

</Paper>
</FormControl>
    </form>

</Box>

</React.Fragment>
  );
}


export default ResetPassword;
