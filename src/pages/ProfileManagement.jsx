import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Container,
} from "@material-ui/core";
import {
  getUserInformations,
  sendResetPasswordMailAndToken,
} from "../api/auth";
import FormHelperText from '@mui/material/FormHelperText';


function ProfileManagement() {
  const [username, setUsername] = useState("example_user");
  const [email, setEmail] = useState("example_user@example.com");
  const [errorSendEmailResetPassword, setErrorSendEmailResetPassword] =
    useState(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameUpdate = () => {
    // Codice per aggiornare l'username nel backend
    console.log(`Aggiornamento username a: ${username}`);
  };

  const handleEmailUpdate = () => {
    // Codice per aggiornare l'email nel backend
    console.log(`Aggiornamento email a: ${email}`);
  };

  const [userInformations, setUserInformations] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserInformations = async () => {
      const res = await getUserInformations();
      setUserInformations({
        name: res.name,
        email: res.email,
        userId: res._id,
      });
    };

    fetchUserInformations();
  }, []);

  const handleResetPassword = async (email) => {
    const res = await sendResetPasswordMailAndToken({ email: email });

    //message è il messaggio di errore inviato dal server
    //ok nel caso il messaggio sia positivo
    if (res.hasOwnProperty("message") == true)
      setErrorSendEmailResetPassword(res.message);
    if (res.hasOwnProperty("ok") == true)
      setErrorSendEmailResetPassword(res.ok);
  };

  return (
    <Container>
      <Grid
        container
        spacing={2}
        style={{ marginTop: 30, alignItems: "center" }}
      >
        <Grid item xs={12} sm={3} md={3}>
          <Typography variant="h6" style={{ marginTop: 20 }}>
            {userInformations.name}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <TextField
            label="new username"
            //onChange={}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#0046be", color: "white" }}
            //onClick={}
          >
            modify Username
          </Button>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        style={{ marginTop: 90, alignItems: "center" }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Typography variant="h6" style={{ marginTop: 20 }}>
            {userInformations.email}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#0046be", color: "white" }}
            //onClick={}
          >
            modify email
          </Button>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        style={{ backgroundColor: "red", color: "white", marginTop: 80 }}
        onClick={() =>
          handleResetPassword(userInformations.email)
        }
      >
        reset password
      </Button>
      {errorSendEmailResetPassword && (
        <FormHelperText error>{errorSendEmailResetPassword}</FormHelperText>
      )}
    </Container>
  );
}

export default ProfileManagement;
